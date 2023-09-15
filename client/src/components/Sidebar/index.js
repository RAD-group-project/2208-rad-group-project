import React from 'react'
import Drawer from '@mui/material/Drawer'
import { makeStyles } from '@mui/styles'
import { Typography, Button, List, ListItem, ListItemButton, Chip, Avatar, Box } from '@mui/material'

import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import axios from 'axios'


const useStyles = makeStyles({
  userSection: {

    background: "linear-gradient(to bottom, #061119, #07344f)",
    padding: "20px",
    color: "#ffffff",
    maxWidth: "180px",
    width: "180px",
  },
  userName: {
    fontSize: "20px",
    marginBottom: "10px",
    textAlign: "center",
    fontWeight: "bold",
  },
  userInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
  },
  chip: {
    borderColor: "#ffffff",
    color: "#ffffff",
  },

  page: {

    background: "linear-gradient(to bottom, #07344f, #061119 )", 
    width: "100%",
    height: "100%",
  },
  drawer: {
    backgroundColor: "#07344f", 
  },
  navLink: {
    padding: "8px 12px",
    paddingLeft: "15px",
    transition: "background-color 0.3s, color 0.3s",
    color: "#ffffff", 
    "&:hover": {
      backgroundColor: "#0670b5", 
      color: "#ffffff", 
    },
  },
  avatar: {
    width: "80px",
    height: "80px",
    fontSize: "30px", 

  },
  addButton: {
    color: '#ffffff',
    backgroundColor: "#07344f", // Professional button color
    '&:hover': {
      backgroundColor: "#005d9d", // Hover color

    },
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  },
});

export const Navitem = ({ path, name }) => {
  const classes = useStyles()

  return (
    <Typography variant='h5' sx={{ marginBottom: 0, color: '#fff' }}>
      <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton className={classes.navLink} >
          {name}
        </ListItemButton>
      </Link>
    </Typography>

  )
}

export default function Sidebar() {

  const { logout, user } = useAuth()
  const logoutUser = () => {
    axios.get(`http://localhost:8083/api/auth/logout`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          logout();
        }
      })
      .catch((error) => {
        logout()
      })
  };


  const classes = useStyles()
  return (
    <div>
      <Drawer

        className={classes.drawer}
        variant='permanent'
        anchor='left'
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
          }
        }}
      >
        <div className={classes.userSection}>
          <Box sx={{ m: 2 }} className={classes.userInfoContainer}>
            <Avatar
              alt={user.name}
              src="/img/avatar.png"
              className={classes.avatar}
            />
            
          </Box>
          <Typography variant='h4' className={classes.userName}>
            {user.name} </Typography>

        </div>
        <div className={classes.page}>

          <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'95%'}}>
        <Box>
            <Navitem path="/dashboard" name="Dashboard" />

            <Navitem path="/books" name="Books" />
            <Navitem path="/authors" name="Authors" />
            <Navitem path="/genres" name="Genres" />
            <Navitem path="/borrowers" name="Borrowers" />
            <Navitem path="/users" name="Members" />
            </Box>

        <Box  style={{  bottom: '10px', color: '#fff', width:'max' }}>
            <Typography
              variant="h5"
             
            >
              
              <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    className={classes.addButton}
                    sx={{
                      padding: '8px 12px',
                    }}
                    onClick={logoutUser}
                  >
                    Logout
                  </Button>
                </div>
              </Link>
            </Typography>
            </Box>
          </div>

        </div>

      </Drawer>

    </div>
  )
}

import React from 'react'
import Drawer from '@mui/material/Drawer'
import { makeStyles } from '@mui/styles'
import { Typography, List, ListItem,ListItemButton, Chip, Avatar, Box} from '@mui/material'

import {Link} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import axios from 'axios'


const useStyles = makeStyles({
  userSection: {
    background: 'linear-gradient(to bottom, #003f5c, #2f4b7c)',
    padding: '20px',
    color: '#ffffff',
    maxWidth:"180px",
    width:"180px"
  },
  userName: {
    fontSize: '24px',
    marginBottom: '10px',
    textAlign:'center'
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center align horizontally
  },
  chip: {
    borderColor: '#ffffff',
    color: '#ffffff',
  },

  page: {
    background: 'linear-gradient(to bottom, #003f5c, #2f4b7c)', // Gradient background color
    width: '100%',
    height: '100%',
  },
  drawer: {
    backgroundColor: '#003f5c', // Matching color for the drawer background
  },
  navLink: {
    padding: '8px 12px',
    paddingLeft: '10px',
    transition: 'background-color 0.3s, color 0.3s',
    color: '#ffffff', // Default text color (white in this example)
    '&:hover': {
      backgroundColor: '#ff6f61', // Hover background color
      color: '#003f5c', // Text color on hover (matching background color)
    },
  },
  avatar: {
    width: '100px',
    height: '100px',
    fontSize: '48px', // Increase font size for larger avatar
  },
});

export const Navitem = ({path, name}) => {
  const classes = useStyles()

  return (
  <Typography variant='h5' sx={{  marginBottom: 0 , color: '#fff' }}>
  <Link to={path} style={{ textDecoration: 'none', color: 'inherit'}}>
    <ListItemButton className={classes.navLink} >
      {name}
    </ListItemButton>
  </Link>
</Typography>

  )
}

export default function Sidebar() {

    const {logout,user} = useAuth()
    const logoutUser = () => {
        // handleClose();
        axios.get(`http://localhost:8083/api/auth/logout`, { withCredentials: true })
          .then((response) => {
            // handle success
            if (response.status === 200) {
              console.log(response.data);
              logout();
            }
          })
          .catch((error) => {
            // handle error
            // alert(error);
            logout()
            // console.log(error);
          })
      };


    const classes = useStyles()
  return (
    <div>
        <Drawer

        className={classes.drawer}
        variant='permanent'
        anchor='left'
        >
          <div className={classes.userSection}>
          <Box sx={{ m: 2 }} className={classes.userInfoContainer}>
        <Avatar
          alt={user.name}
          src="/static/images/avatar/1.jpg"
          className={classes.avatar}
        />
        {/* <Chip
          label={user.name}
          variant="outlined"
          className={classes.chip}
        /> */}
      </Box>
      <Typography variant='h4' className={classes.userName}>
      {user.name} </Typography>

    </div>
          <div className = {classes.page}>

          <div>

<Navitem path="/dashboard" name="Dashboard"/>

<Navitem path="/books" name="Books"/>
<Navitem path="/authors" name="Authors"/>
<Navitem path="/genres" name="Genres"/>
<Navitem path="/borrowers" name="Borrowers"/>
<Navitem path="/users" name="Users"/>



            <Typography
              variant="h5"
              style={{ position: 'absolute', bottom: '10px', color: '#fff',  }}
            >
              <Link to="#" style={{ textDecoration: 'none', color: 'inherit'}}>
              <ListItemButton  sx={{ width: '100%', padding: '8px 12px' }}  onClick={logoutUser}>
                Logout
              </ListItemButton>
              </Link>
            </Typography>
          </div>

          </div>

        </Drawer>


{/* <div>
  <Box sx={{px:"100%",py:1}}> 
      <Box sx={{ mr:10, pr:10 , display: 'flex', justifyContent: 'flex-end' }} >
        <Chip
          avatar={<Avatar alt={user.name} src="/static/images/avatar/1.jpg" />}
          label={user.name}
          variant="outlined"
        />
      </Box>
  </Box>
</div> */}
    </div>
  )
}

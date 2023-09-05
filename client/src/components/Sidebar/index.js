import React from 'react'
import Drawer from '@mui/material/Drawer'
import { makeStyles } from '@mui/styles'
import { Typography, List, ListItem,ListItemButton, Chip, Avatar, Box} from '@mui/material'

import {Link} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import axios from 'axios'

const drawerWidth = 210

const useStyles = makeStyles({
    page: {
        background: '#202e51',
        width:'100%',
        height: '100%'
 
    },
    drawer: {
        // width: drawerWidth,
        backgroundColor: '#202e51',
    },
    navLink: {
      padding: '8px 0',
      paddingLeft: 2,
      transition: 'background-color 0.3s, color 0.3s','&:hover': {
        backgroundColor: '#4793d2', // Change to the desired hover background color

      },
    },
});

export const Navitem = ({path, name}) => {
  const classes = useStyles()

  return (
  <Typography variant='h5' sx={{  marginBottom: 0 , color: '#fff' }}>
  <Link to={path} style={{ textDecoration: 'none', color: 'inherit'}}>
    <ListItemButton className={classes.navLink} sx={{ pl:2, pr:2 }}>
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
          <div>
            <Typography variant='h4'></Typography>
              <Box sx={{ m: 2 }} >
                <Chip
                  avatar={<Avatar alt={user.name} src="/static/images/avatar/1.jpg" />}
                  label={user.name}
                  variant="outlined"
                />
              </Box>
          </div>
          <div className = {classes.page}>

          <div>

<Navitem path="/dashboard" name="Dashboard"/>

<Navitem path="/books" name="Books"/>
<Navitem path="/authors" name="Authors"/>
<Navitem path="/genres" name="Genres"/>
<Navitem path="/borrowings" name="Borrowings"/>
<Navitem path="/users" name="Users"/>



            <Typography
              variant="h5"
              style={{ position: 'absolute', bottom: '10px', color: '#fff' }}
            >
              <ListItemButton className={classes.navLink} sx={{width:'100%'}} onClick={logoutUser}>
                Logout
              </ListItemButton>
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

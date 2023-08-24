import React from 'react'
import Drawer from '@mui/material/Drawer'
import { makeStyles } from '@mui/styles'
import { Typography, List, ListItem,ListItemButton, Chip, Avatar, Box} from '@mui/material'

import {Link} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import axios from 'axios'

const drawerWidth = 240

const useStyles = makeStyles({
    page: {
        background: '#f9f9f9',
        width:'100%'
 
    },
    drawer: {
        width: drawerWidth
    }
})

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
            alert(error);
            
            console.log(error);
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
          <Typography variant='h4'>

            </Typography>

            <Box sx={{ m: 2 }} >
            <Chip
              avatar={<Avatar alt={user.name} src="/static/images/avatar/1.jpg" />}
              label={user.name}
              variant="outlined"
/>
 </Box>

          </div>
            <div>



<Typography variant='h5'>
    <Link to="/dashboard">
    <ListItemButton>
    Dashboard
    </ListItemButton>
    </Link>

</Typography>
<Typography variant='h5'>
<Link to="/books">


    <ListItemButton>
    Books
    </ListItemButton>
    </Link>

</Typography>

<Typography variant='h5'>
<Link to="/authors">


    <ListItemButton>
    Authors
    </ListItemButton>
    </Link>

</Typography>
<Typography variant='h5'>
<Link to="/genres">


    <ListItemButton>
    Genres

    </ListItemButton>
    </Link>

</Typography>

<Typography variant='h5'>
<Link to="/borrowings">


    <ListItemButton>
    Borrowings

    </ListItemButton>
    </Link>

</Typography>


<Typography variant='h5'>
<Link to="/Users">


    <ListItemButton>
    Users

    </ListItemButton>
    </Link>

</Typography>

<Typography variant="h5" style={{ position: 'absolute', bottom: '10px' }}>
  <ListItemButton onClick={logoutUser}>
    Logout
  </ListItemButton>
</Typography>

            </div>
        </Drawer>
    </div>
  )
}

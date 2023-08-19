import React from 'react'
import Drawer from '@mui/material/Drawer'
import { makeStyles } from '@mui/styles'
import { Typography, List, ListItem,ListItemButton} from '@mui/material'

import {Link} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

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

    const {logout} = useAuth()



    const classes = useStyles()
  return (
    <div>
        <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        >
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

<Typography variant="h5" style={{ position: 'absolute', bottom: '10px' }}>
  <ListItemButton onClick={logout}>
    Logout
  </ListItemButton>
</Typography>

            </div>
        </Drawer>
    </div>
  )
}

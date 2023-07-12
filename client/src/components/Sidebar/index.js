import React from 'react'
import Drawer from '@mui/material/Drawer'
import { makeStyles } from '@mui/styles'
import { Typography, List, ListItem,ListItemButton} from '@mui/material'

import {Link} from 'react-router-dom'

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
    <Link to="/home">
    <ListItemButton>
    Home
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
            </div>
        </Drawer>
    </div>
  )
}

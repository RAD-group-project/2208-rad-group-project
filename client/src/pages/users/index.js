import * as React from 'react'

import Dashboard from './dashboard'
import Add from './add'
import Delete from './delete'
import Update from './update'
import { Box, Typography,Button, Dialog, DialogContent, DialogContentText } from '@mui/material'

export default function Books() {
    const [open,setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

  return (
    <div>
        <Box sx={{ml:24}}>

        <Typography variant='h3'>Users</Typography> 
        <Button variant='outlined' onClick={handleClickOpen} >Add Users</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                {/* <DialogContentText> */}
                    <Add />
                {/* </DialogContentText> */}
            </DialogContent>
        </Dialog>
        <Dashboard />

        </Box>


      
    </div>
  )
}

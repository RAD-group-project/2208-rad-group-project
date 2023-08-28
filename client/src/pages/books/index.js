import * as React from 'react'

import Dashboard from './dashboard'
import Add from './add'
import Delete from './delete'
import Update from './update'
import { Box, Typography,Button, Dialog, DialogContent, DialogContentText } from '@mui/material'

export default function Books() {
    const [open,setOpen] = React.useState(false);
    const [trigger, setTrigger] = React.useState(0);

    const updateTrigger = () => {
    setTrigger((trigger)=> trigger + 1)
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

  return (
    <div>
        <Box sx={{ml:28,my:5}}>

            <Typography variant='h3'>Books</Typography> 
            <Box sx={{mx:2,my:3}}>
            <Button variant='outlined' onClick={handleClickOpen} >Add Books</Button>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    {/* <DialogContentText> */}
                        <Add handleClose={handleClose} updateTrigger={updateTrigger} />
                    {/* </DialogContentText> */}
                </DialogContent>
            </Dialog>
            <Box sx={{mt:2,mx:2}}>
                <Dashboard trigger={trigger} />
            </Box>

        </Box>
     
    </div>
  )
}

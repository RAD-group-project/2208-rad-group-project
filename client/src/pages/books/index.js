import * as React from 'react'

import Dashboard from './dashboard'
import Add from './add'
import { Box, Typography,Button, Dialog, DialogContent, DialogContentText } from '@mui/material'
import { makeStyles } from '@mui/styles'

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
    const useStyles = makeStyles({
        booksContainer: {
          backgroundImage: 'url("/img/library.jpeg")',
            // background: `
            // linear-gradient(to bottom, #003f5c, #2f4b7c),
            // radial-gradient(circle, rgba(0, 0, 0, 0.2) 10%, rgba(0, 0, 0, 0) 70%)`,
          backgroundBlendMode: 'multiply, normal',
          minHeight: '100vh', // Adjust as needed
          padding: '20px',
          color: '#ffffff',
          textAlign: 'left',
        },
        header: {
          display: 'flex',
          justifyContent: 'space-between'
        },
        sectionTitle: {
          fontSize: '50px',
          marginBottom: '15px',
        },
        addButton: {
          color: '#ffffff',
          backgroundColor: "#007acc", // Professional button color
          '&:hover': {
          backgroundColor: "#005d9d", // Hover color
          
          },
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
        },
      });
    
      const classes = useStyles();

  return (
    <div className={classes.booksContainer}>
        <Box sx={{ml:28,my:5}} >

            <Box className={classes.header}  >
            <Typography variant='h3' className={classes.sectionTitle}>
                Books
            </Typography> 
            <Box sx={{mx:2,my:3}}>
            <Button variant='outlined' onClick={handleClickOpen} className={classes.addButton}>
                Add Book
            </Button>
            </Box>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                        <Add handleClose={handleClose} updateTrigger={updateTrigger} />
                </DialogContent>
            </Dialog>
            <Box sx={{mt:2,mx:2}}>
                <Dashboard trigger={trigger} />
            </Box>

        </Box>
     
    </div>
  )
}

import * as React from 'react'

import Dashboard from './dashboard'
import Add from './add'
import { Box, Typography, Button, Dialog, DialogContent, DialogContentText } from '@mui/material'
import { makeStyles } from '@mui/styles'

export default function Genres() {
  const [open, setOpen] = React.useState(false);
  const [trigger, setTrigger] = React.useState(0);

  const updateTrigger = () => {
    setTrigger((trigger) => trigger + 1)
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  const useStyles = makeStyles({
    genresContainer: {
      backgroundImage: 'url("/img/library.jpeg")',
      backgroundRepeat: 'round',
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
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px"
    },
    sectionTitle: {
      fontSize: "40px",
      marginBottom: "20px",
      marginTop: "20px",
      paddingLeft: "25px"
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
    <div className={classes.genresContainer}>
      <Box sx={{ ml: 28, my: 5 }} >

        <Box className={classes.header}  >
          <Typography variant='h3' className={classes.sectionTitle}>
            Genres
          </Typography>
          <Box sx={{ mx: 2, my: 3 }}>
            <Button variant='outlined' onClick={handleClickOpen} className={classes.addButton}>
              Add Genre
            </Button>
          </Box>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Add handleClose={handleClose} updateTrigger={updateTrigger} />
          </DialogContent>
        </Dialog>
        <Box sx={{ mt: 2, mx: 2 }}>
          <Dashboard trigger={trigger} />
        </Box>

      </Box>

    </div>
  )
}

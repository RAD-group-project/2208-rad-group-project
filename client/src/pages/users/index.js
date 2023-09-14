import * as React from 'react';
import Dashboard from './dashboard-1';
import Add from './add';
import { Box, Typography, Button, Dialog, DialogContent } from '@mui/material';
import { makeStyles } from '@mui/styles'





export default function Users() {
  const [open, setOpen] = React.useState(false);
  const [trigger, setTrigger] = React.useState(0);

  const updateTrigger = () => {
    setTrigger((trigger) => trigger + 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles({
    usersContainer: {
        background: `
        linear-gradient(to bottom, #003f5c, #2f4b7c),
        radial-gradient(circle, rgba(0, 0, 0, 0.2) 10%, rgba(0, 0, 0, 0) 70%)`,
      backgroundBlendMode: 'multiply, normal',
      minHeight: '100vh', // Adjust as needed
      padding: '20px',
      color: '#ffffff',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: '32px',
      marginBottom: '20px',
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
    <div className={classes.usersContainer}>
      <Box sx={{ ml: 28, my: 5 }}>
        <Typography variant='h3' className={classes.sectionTitle}>
          Users
        </Typography>
        <Box sx={{ mx: 2, my: 3 }}>
          <Button variant='outlined' onClick={handleClickOpen} className={classes.addButton}>
            Add Users
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Add handleClose={handleClose} updateTrigger={updateTrigger} />
          </DialogContent>
        </Dialog>
        <Box   sx={{ mt: 2,mx: 2}}>
          <Dashboard trigger={trigger} />
        </Box>
      </Box>
    </div>
  );
}

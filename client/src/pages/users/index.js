import * as React from 'react';
import Dashboard from './dashboard';
import Add from './add';
import { Box, Typography, Button, Dialog, DialogContent } from '@mui/material';
import { makeStyles } from '@mui/styles'





export default function Books() {
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
    booksContainer: {
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
      borderColor: '#ffffff',
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.booksContainer}>
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
        <Box   sx={{
    mt: 2,
    mx: 2,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
    borderRadius: '8px', // Rounded corners for a card-like appearance
    backgroundColor: '#ffffff', // Card background color
    padding: '16px', // Padding within the card
    opacity:0.9
  }}>
          <Dashboard trigger={trigger} />
        </Box>
      </Box>
    </div>
  );
}

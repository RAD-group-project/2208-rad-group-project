import * as React from 'react';
import Table from './table';
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
      backgroundImage: 'url("/img/library.jpeg")',
      backgroundRepeat: 'round',
      // background: `
      // linear-gradient(to bottom, #272643, #2f2e52),
      // radial-gradient(circle, rgba(0, 0, 0, 0.2) 10%, rgba(0, 0, 0, 0) 70%)`,
      backgroundBlendMode: "multiply, normal",
      minHeight: "100vh", // Adjust as needed
      padding: "20px",
      color: "#ffffff",
      textAlign: "left",
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
    <div className={classes.usersContainer}>
      <Box sx={{ ml: 28, my: 5 }}>
      <Box className={classes.header}> 
        <Typography variant='h3' className={classes.sectionTitle}>
          Members
        </Typography>
        <Box sx={{ mx: 2, my: 3 }}>
          <Button variant='outlined' onClick={handleClickOpen} className={classes.addButton}>
            Add Members
          </Button>
          </Box>

        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Add handleClose={handleClose} updateTrigger={updateTrigger} />
          </DialogContent>
        </Dialog>
        <Box
          // sx={{
          //   mt: 2,
          //   mx: 2,
          //   boxShadow:
          //     "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)",
          //   borderRadius: "8px", // Rounded corners for a card-like appearance
          //   backgroundColor: "#cccccc", // Card background color
          //   padding: "16px", // Padding within the card
          //   opacity: 0.9,
          //   margin: "20px"
          // }}
        >
          <Table trigger={trigger} />
        </Box>
      </Box>
    </div>
  );
}

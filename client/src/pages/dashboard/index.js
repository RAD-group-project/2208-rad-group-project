import * as React from 'react'
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default function Dashboard() {
  const useStyles = makeStyles({
    genresContainer: {
      backgroundImage: 'url("/img/library.jpeg")',
      backgroundRepeat: 'round',
      backgroundBlendMode: 'multiply, normal',
      minHeight: '100vh',
      padding: '20px',
      color: '#ffffff',
      textAlign: 'left',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    sectionTitle: {
      fontSize: '50px',
      marginBottom: '15px',
    },
    addButton: {
      color: '#ffffff',
      backgroundColor: '#007acc',
      '&:hover': {
        backgroundColor: '#005d9d',
      },
      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    },
    libraryTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      borderRadius: '10px',
    },
    libraryText: {
      fontSize: '60px',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      color: '#333',
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.genresContainer}>
      <Box sx={{ ml: 28, my: 5 }}>
        <Box className={classes.header}></Box>
      </Box>

      {/* Box for "Library management system" */}
      {/* <Box className={classes.libraryTextContainer}>
        <div className={classes.libraryText}>Library management system</div>
      </Box> */}
    </div>
  );
}

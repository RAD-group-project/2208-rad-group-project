import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';

import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, ListItemIcon, MenuItem, Typography, Tooltip, IconButton } from '@mui/material';
import { AccountCircle, Send, Delete, Edit } from '@mui/icons-material';
import Update from './update';

import { backendUrl } from '../../data';
import axios from 'axios';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  actionButtonStyles: {
    backgroundColor: '#ffffff', // Button background color
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.23)', // Shadow
    borderRadius: '4px', // Rounded corners
    transition: 'transform 0.2s ease-in-out', // Add a subtle hover effect
    '&:hover': {
      transform: 'scale(1.05)', // Enlarge the button on hover
    },
  },
  menuItemStyles: {
    backgroundColor: '#ffffff', // Menu item background color
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.23)', // Shadow
    borderRadius: '4px', // Rounded corners
    '&:hover': {
      backgroundColor: '#f0f0f0', // Change background color on hover
    },
  },
}));


const Dashboard = ({trigger}) => {

  const classes = useStyles();

  const [genres, setGenres] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);

  useEffect(() => {
    getAllGenres();
  }, [trigger]);

  const getAllGenres = () => {
    console.log(backendUrl + 'genre/getAll')
    axios.get(backendUrl + 'genre/getAll')
      .then((response) => {
        // handle success
        console.log(response.data);
        const genres = response.data.genresList.filter(genre => genre);
        setGenres(genres);
        setIsTableLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };


  const deleteGenre = (genreId) => {
    axios.delete(`${backendUrl}genre/delete/${genreId}`)
      .then((response) => {
        handleClose();
        console.log(response.data);
        getAllGenres();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const [openUpdate,setOpenUpdate] = useState(false);
  const [openDelete,setOpenDelete] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null); // Add selectedBook state
  const [selectedGenreId, setSelectedGenreId] = useState(null);



  const handleClickUpdate = (genre) => {
    setSelectedGenre(genre);
    setOpenUpdate(true);
  }

  const handleClickDelete = (genre) => {
    console.log(genre['row']['original']['_id'])
    setSelectedGenreId(genre['row']['original']['_id'])
    setOpenDelete(true);
  }
  const handleClose = () => {
    setOpenUpdate(false);
    setOpenDelete(false);
  }

  
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'category',
        header: 'Category',
        size: 150
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 150
      },
      
    ],
    [],
  );

  


  return (
  <div> <MaterialReactTable 
  columns={columns}
  data={genres}
  enableRowActions
  renderRowActions={( rowData) => (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <Tooltip arrow placement="left" title="Edit">
      <IconButton onClick={() => handleClickUpdate(rowData)} className={classes.actionButtonStyles}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip arrow placement="right" title="Delete">
      <IconButton color="error" onClick={() => handleClickDelete(rowData)} className={classes.actionButtonStyles}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )}
  renderRowActionMenuItems={({ closeMenu, rowData }) => [
    
    <MenuItem
      key={0}
      onClick={() => {
        // View profile logic...
        handleClickUpdate(rowData);
        closeMenu()
      }}
      sx={{ m: 0 }}
    >
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      Update
    </MenuItem>,
    <MenuItem
      key={1}
      onClick={() => {
        // Send email logic...
        handleClickDelete(rowData)
        closeMenu();
      }}
      sx={{ m: 0 }}
    >
      <ListItemIcon>
        <Send />
      </ListItemIcon>
      Delete
    </MenuItem>,
  ]}
  renderDetailPanel={({ row }) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <img
        alt={row.original.title}
        height={200}
        src={`https://covers.openlibrary.org/b/isbn/${row.original.ISBN}-M.jpg`}
        loading="lazy"

        // style={{ borderRadius: '50%' }}
      />
      {console.log(row)}
      <Box sx={{ textAlign: 'left', ml: 20 }}>
        <Typography variant="h4">{row.original.category}</Typography>
        <Typography variant="h5">
          {row.original.description}
        </Typography>
      </Box>
    </Box>
  )}
  
  />

<Dialog open={openUpdate} onClose={handleClose}>
            <DialogContent>
                {/* <DialogContentText> */}
                  <Update genre={selectedGenre} handleClose={handleClose} getAllGenres={getAllGenres}/>
                  {/* </DialogContentText> */}
            </DialogContent>
        </Dialog>

      <Dialog open={openDelete} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
          {" Delete This Genre?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete This Genre?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteGenre(selectedGenreId)}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
        </Dialog>
  </div>
  
  
  
  );
};

export default Dashboard;

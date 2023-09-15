import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';

import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, ListItemIcon, MenuItem, Typography, Tooltip, IconButton } from '@mui/material';
import { AccountCircle, Send, Delete, Edit } from '@mui/icons-material';
import Update from './update';

import { backendUrl } from '../../data';
import axios from 'axios';


const Table = ({ trigger }) => {

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
        const genresList = response.data.data
        setGenres(genresList);
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


  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
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
    <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
      <MaterialReactTable
        columns={columns}
        data={genres}
        enableRowActions
        renderRowActions={(rowData) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => handleClickUpdate(rowData)} >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleClickDelete(rowData)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderRowActionMenuItems={({ closeMenu, rowData }) => [

          <MenuItem
            key={0}
            onClick={() => {
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
              handleClickDelete()
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


      />

      <Dialog open={openUpdate} onClose={handleClose}>
        <DialogContent>
          <Update genre={selectedGenre} handleClose={handleClose} getAllGenres={getAllGenres} />

        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {" Delete Genre"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
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

export default Table;

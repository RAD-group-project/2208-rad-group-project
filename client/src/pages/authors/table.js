import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';

import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, ListItemIcon, MenuItem, Typography, Tooltip, IconButton } from '@mui/material';
import { AccountCircle, Send, Delete, Edit } from '@mui/icons-material';
import Update from './update';
import { backendUrl } from '../../data';
import axios from 'axios';
import { format } from 'date-fns';


const Table = ({ trigger }) => {

  const [authors, setAuthors] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);

  useEffect(() => {
    getAllAuthors();
  }, [trigger]);

  const getAllAuthors = () => {
    console.log(backendUrl + 'author/getAll')
    axios.get(backendUrl + 'author/getAll')
      .then((response) => {
        // handle success
        console.log(response.data);
        var authorList = response.data.authorsList

        var authorList = authorList.map(author => {
          const formattedDateOfBirth = format(new Date(author.dateOfBirth), 'yyyy-MM-dd');

          return {
            ...author,
            dateOfBirth: formattedDateOfBirth,
          };
        });

        setAuthors(authorList);
        setIsTableLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };


  const deleteAuthor = (authorId) => {
    axios.delete(`${backendUrl}author/delete/${authorId}`)
      .then((response) => {
        handleClose();
        console.log(response.data);
        getAllAuthors();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);



  const handleClickUpdate = (author) => {
    setSelectedAuthor(author);
    setOpenUpdate(true);
  }

  const handleClickDelete = (author) => {
    console.log(author['row']['original']['_id'])
    setSelectedAuthorId(author['row']['original']['_id'])
    setOpenDelete(true);
  }
  const handleClose = () => {
    setOpenUpdate(false);
    setOpenDelete(false);
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 150
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150
      },
      {
        accessorKey: 'nationality',
        header: 'Nationality',
        size: 150
      },
      {
        accessorKey: 'dateOfBirth',
        header: 'Date of Birth',
        size: 150
      },
      {
        accessorKey: 'startDateOfPublishing',
        header: 'Start Date of Publishing',
        size: 150
      },
      {
        accessorKey: 'genre',
        header: 'Genres',
        size: 150
      },
      {
        accessorKey: 'noOfBooksWritten',
        header: 'Number of Works',
        size: 150
      },

    ],
    [],
  );


  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
      <MaterialReactTable
        columns={columns}
        data={authors}
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
          <Update author={selectedAuthor} handleClose={handleClose} getAllAuthors={getAllAuthors} />
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {" Delete Author"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteAuthor(selectedAuthorId)}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default Table;



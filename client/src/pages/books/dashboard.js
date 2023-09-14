import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';

import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, ListItemIcon, MenuItem, Typography, Tooltip, IconButton } from '@mui/material';
import { AccountCircle, Send, Delete, Edit } from '@mui/icons-material';
import Update from './update';

import { backendUrl } from '../../data';
import axios from 'axios';


const Dashboard = ({ trigger }) => {
  const [books, setBooks] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);

  useEffect(() => {
    getAllBooks();
  }, [trigger]);

  const getAllBooks = () => {
    console.log(backendUrl + 'book/getAll')
    axios.get(backendUrl + 'book/getAll')
      .then((response) => {
        // handle success
        console.log(response.data);
        const booksList = response.data.booksList
        setBooks(booksList);
        setIsTableLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };


  const deleteBook = (bookId) => {
    axios.delete(`${backendUrl}book/delete/${bookId}`)
      .then((response) => {
        handleClose();
        console.log(response.data);
        getAllBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // Add selectedBook state
  const [selectedBookId, setSelectedBookId] = useState(null);



  const handleClickUpdate = (book) => {
    setSelectedBook(book);
    setOpenUpdate(true);
  }

  const handleClickDelete = (book) => {
    console.log(book['row']['original']['_id'])
    setSelectedBookId(book['row']['original']['_id'])
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
        accessorKey: 'title',
        header: 'Title',
        size: 150
      },
      {
        accessorKey: 'author',
        header: 'Author',
        size: 150
      },
      {
        accessorKey: 'ISBN',
        header: 'ISBN',
        size: 150
      },
      {
        accessorKey: 'publisher',
        header: 'Publisher',
        size: 150
      },
      {
        accessorKey: 'datePublished',
        header: 'Date Published',
        size: 150
      },
      {
        accessorKey: 'genre',
        header: 'Genre',
        size: 150
      },
      {
        accessorKey: 'copies',
        header: 'Copies',
        size: 150
      },

    ],
    [],
  );

  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
      <MaterialReactTable
        columns={columns}
        data={books}
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
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              ml: "50px",
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
            <Box sx={{ textAlign: 'left', ml: 10 }}>
              <Typography variant="h4">{row.original.title}</Typography>
              <Typography variant="h5">
                {row.original.author}
              </Typography>
            </Box>
          </Box>
        )}

      />

      <Dialog open={openUpdate} onClose={handleClose}>
        <DialogContent>
          {/* <DialogContentText> */}
          <Update book={selectedBook} handleClose={handleClose} getAllBooks={getAllBooks} />
          {/* </DialogContentText> */}
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {" Delete Book"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteBook(selectedBookId)}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>



  );
};

export default Dashboard;

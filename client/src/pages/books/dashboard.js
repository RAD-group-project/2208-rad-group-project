import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';

import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import Update from './update';


//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: 'Homo Deus: A Brief History of Tomorrow ',
    author: 'Yuval Noah harari',
    isbn: '978-0062464316',
    copies: 6,
    registered:'03-08-2022'
  },
  {
    name: 'Homo Deus: A Brief History of Tomorrow ',
    author: 'Yuval Noah harari',
    isbn: '978-0062464316',
    copies: 6,
    registered:'03-08-2022'
  },
  {
    name: 'Homo Deus: A Brief History of Tomorrow ',
    author: 'Yuval Noah harari',
    isbn: '978-0062464316',
    copies: 6,
    registered:'03-08-2022'
  },
  {
    name: 'Homo Deus: A Brief History of Tomorrow ',
    author: 'Yuval Noah harari',
    isbn: '978-0062464316',
    copies: 6,
    registered:'03-08-2022'
  },
  {
    name: 'Homo Deus: A Brief History of Tomorrow ',
    author: 'Yuval Noah harari',
    isbn: '978-0062464316',
    copies: 6,
    registered:'03-08-2022'
  },
];



const Dashboard = () => {

  const [openUpdate,setOpenUpdate] = useState(false);
  const [openDelete,setOpenDelete] = useState(false);


  const handleClickUpdate = () => {
    setOpenUpdate(true);
  }

  const handleClickDelete = () => {
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
        accessorKey: 'name',
        header: 'Name',
        size: 150
      },
      {
        accessorKey: 'author',
        header: 'Author',
        size: 150
      },
      {
        accessorKey: 'isbn',
        header: 'ISBN',
        size: 150
      },
      {
        accessorKey: 'copies',
        header: 'No.of Copies',
        size: 150
      },
      {
        accessorKey: 'registered',
        header: 'Registered Date',
        size: 150
      },
    ],
    [],
  );

  


  return (
  <div> <MaterialReactTable 
  columns={columns}
  data={data}
  enableRowActions
  renderRowActionMenuItems={({ closeMenu }) => [
    <MenuItem
      key={0}
      onClick={() => {
        // View profile logic...
        handleClickUpdate();
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

  
  
  />

<Dialog open={openUpdate} onClose={handleClose}>
            <DialogContent>
                <DialogContentText>
                  <Update />
                  </DialogContentText>
            </DialogContent>
        </Dialog>

      <Dialog open={openDelete} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
          {" Delete This Item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete This Item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
        </Dialog>
  </div>
  
  
  
  );
};

export default Dashboard;

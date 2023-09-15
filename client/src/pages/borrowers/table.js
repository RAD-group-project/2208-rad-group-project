import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';

import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, ListItemIcon, MenuItem, Typography, Tooltip, IconButton, Paper } from '@mui/material';
import { AccountCircle, Send, Delete, Edit } from '@mui/icons-material';
import Update from './update';

import { backendUrl } from '../../data';
import axios from 'axios';

import { format } from 'date-fns';


const Table = ({trigger}) => {

  const [borrowers, setBorrowers] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);

  useEffect(() => {
    getAllBorrowers();
  }, [trigger]);

  const getAllBorrowers = () => {
    console.log(backendUrl + 'borrower/getAll')
    axios.get(backendUrl + 'borrower/getAll')
      .then((response) => {
        // handle success
        console.log(response.data);
        var borrowersList = response.data.borrowersList;

        var borrowersList = borrowersList.map(borrower => {
          const formattedCheckoutDate = format(new Date(borrower.checkoutDate), 'yyyy-MM-dd');
          const formattedDueDate = format(new Date(borrower.dueDate), 'yyyy-MM-dd');

          return {
            ...borrower,
            checkoutDate: formattedCheckoutDate,
            dueDate: formattedDueDate,
          };
        });

        setBorrowers(borrowersList);
        setIsTableLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };


  const deleteBorrower = (borrowerId) => {
    axios.delete(`${backendUrl}borrower/delete/${borrowerId}`)
      .then((response) => {
        handleClose();
        console.log(response.data);
        getAllBorrowers();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const [openUpdate,setOpenUpdate] = useState(false);
  const [openDelete,setOpenDelete] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState(null); 
  const [selectedBorrowerId, setSelectedBorrowerId] = useState(null);



  const handleClickUpdate = (borrower) => {
    setSelectedBorrower(borrower);
    setOpenUpdate(true);
  }

  const handleClickDelete = (borrower) => {
    console.log(borrower["row"]["original"]["_id"]);
    setSelectedBorrowerId(borrower["row"]["original"]["_id"]);
    setOpenDelete(true);
  }
  const handleClose = () => {
    setOpenUpdate(false);
    setOpenDelete(false);
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "ISBN",
        header: "ISBN",
        size: 150,
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey: "author",
        header: "Author",
        size: 150,
      },
      {
        accessorKey: "checkoutDate",
        header: "Checkout Date",
        size: 150,
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
        size: 150,
      },
    ],
    []
  );

  
  return (
    <div style={{ borderRadius: "10px", overflow: "hidden" }}>
      <MaterialReactTable
        columns={columns}
        data={borrowers}
        enableRowActions
        renderRowActions={(rowData) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() => handleClickUpdate(rowData)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton
                color="error"
                onClick={() => handleClickDelete(rowData)}
              >
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
              closeMenu();
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
              handleClickDelete();
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
          <Update
            borrower={selectedBorrower}
            handleClose={handleClose}
            getAllBorrowers={getAllBorrowers}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
          {" Delete Borrower"}

        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteBorrower(selectedBorrowerId)}>
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Table;

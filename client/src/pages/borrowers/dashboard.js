import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';

import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, ListItemIcon, MenuItem, Typography, Tooltip, IconButton, Paper } from '@mui/material';
import { AccountCircle, Send, Delete, Edit } from '@mui/icons-material';
import Update from './update';

import { backendUrl } from '../../data';
import axios from 'axios';


const Dashboard = ({trigger}) => {

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
        const members = response.data.borrowersList;
        setBorrowers(members);
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
  const [selectedBorrower, setSelectedBorrower] = useState(null); // Add selectedBorrower state
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

  
  //should be memoized or stable
  const columns = useMemo(
    () => [
      // {
      //   accessorKey: "userID",
      //   header: "User ID",
      //   size: 150,
      // },
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
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
        // tableOptions={{
        //   tableRowClass: classes.tableRow,
        //   tableHeaderClass: classes.tableHeader,
        // }}
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
              // View profile logic...
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
              // Send email logic...
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

        //   renderDetailPanel={({ row }) => (
        //     <Box
        //       sx={{
        //         display: 'flex',
        //         justifyContent: 'space-around',
        //         alignItems: 'center',
        //       }}
        //     >
        //       <img
        //         alt={row.original.title}
        //         height={200}
        //         src={`https://covers.openlibrary.org/b/isbn/${row.original.ISBN}-M.jpg`}
        //         loading="lazy"
        //         // style={{ borderRadius: '50%' }}
        //       />
        //       {console.log(row)}
        //       <Box sx={{ textAlign: 'center' }}>
        //         <Typography variant="h4">{row.original.title}</Typography>
        //         <Typography variant="h5">
        //           {row.original.author}
        //         </Typography>
        //       </Box>
        //     </Box>
        //   )}
      />

      <Dialog open={openUpdate} onClose={handleClose}>
        <DialogContent>
          {/* <DialogContentText> */}
          <Update
            borrower={selectedBorrower}
            handleClose={handleClose}
            getAllBorrowers={getAllBorrowers}
          />
          {/* </DialogContentText> */}
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {" Delete This Borrower?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete This Borrower?
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

export default Dashboard;

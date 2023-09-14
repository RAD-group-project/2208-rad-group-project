import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

import { backendUrl } from "../../data";

const useStyles = makeStyles((theme) => ({
  textField: {
    backgroundColor: "white", // Background color
    borderRadius: "4px",
    marginBottom: "16px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "lightgray", // Border color
      },
      "&:hover fieldset": {
        borderColor: "blue", // Hover border color
      },
      "&.Mui-focused fieldset": {
        borderColor: "green", // Focused border color
      },
    },
  },
}));

const validationSchema = yup.object({
  // userID: yup.string("Enter member ID number").required("Member ID is required"),
  // firstName: yup.string("Enter first name").required("First name is required"),
  // lastName: yup.string("Enter last name").required("Last name is required"),
  name: yup.string("Enter your name").required("Name is required"),
  ISBN: yup.string("Enter ISBN").required("ISBN is required"),
  title: yup.string("Enter book title").required("Title is required"),
  author: yup.string("Enter the author").required("Author is required"),
  checkoutDate: yup
    .date("Enter checkout date")
    .required("Checkout date is required"),
  dueDate: yup.date("Enter due date").required("Due date is required"),
  // returnDate: yup.string("Enter returned date").required("Return date is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string("Enter contact number"),
});

// const apiUrl = backendUrl + 'borrower/add'

const addBorrowerApi = async (borrowerData) => {
  try {
    const response = await axios.post(`${backendUrl}borrower/add`, borrowerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Add = ({ handleClose, updateTrigger }) => {

  const classes = useStyles();

  const [borrower, setBorrower] = useState({
    // userID: "",
    // firstName: "",
    // lastName: "",
    name: "",
    ISBN: "",
    title: "",
    author: "",
    checkoutDate: "",
    dueDate: "",
    email: "",
    phone: "",
  });

  const formik = useFormik({
    initialValues: borrower,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await addBorrowerApi(values);
        // alert("Borrower added successfully");

        handleClose();
        updateTrigger();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert("Borrower already exists");
        } else {
          console.log(error);
          alert("Something went wrong, please try again");
        }
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {/* <TextField
          fullWidth
          id="userID"
          name="userID"
          label="User ID"
          value={formik.values.userID}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userID && Boolean(formik.errors.userID)}
          helperText={formik.touched.userID && formik.errors.userID}
          className={classes.textField}
        /> */}

        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          className={classes.textField}
        />

        <TextField
          fullWidth
          id="ISBN"
          name="ISBN"
          label="ISBN"
          value={formik.values.ISBN}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.ISBN && Boolean(formik.errors.ISBN)}
          helperText={formik.touched.ISBN && formik.errors.ISBN}
          className={classes.textField}
        />

        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          className={classes.textField}
        />

        <TextField
          fullWidth
          id="author"
          name="author"
          label="Author"
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
          className={classes.textField}
        />

        <TextField
          fullWidth
          id="checkoutDate"
          name="checkoutDate"
          label="Checkout Date"
          type="date"
          value={formik.values.checkoutDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.checkoutDate && Boolean(formik.errors.checkoutDate)
          }
          helperText={formik.touched.checkoutDate && formik.errors.checkoutDate}
          InputLabelProps={{ shrink: true }}
          className={classes.textField}
          inputLabelProps={{ shrink: true }} 
        />

        <TextField
          fullWidth
          id="dueDate"
          name="dueDate"
          label="Due Date"
          type="date"
          value={formik.values.dueDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
          helperText={formik.touched.dueDate && formik.errors.dueDate}
          InputLabelProps={{ shrink: true }}
          className={classes.textField}
          inputLabelProps={{ shrink: true }} 
        />

        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          className={classes.textField}
        />

        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          className={classes.textField}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Add;

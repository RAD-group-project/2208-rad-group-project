import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import axios from "axios";

import { backendUrl } from "../../data";

const validationSchema = yup.object({
    userID: yup.string("Enter member ID number").required("Member ID is required"),
    firstName: yup.string("Enter first name").required("First name is required"),
    lastName: yup.string("Enter last name").required("Last name is required"),
    ISBN: yup.string('Enter ISBN').required('ISBN is required'),
    title: yup.string("Enter book title").required("Title is required"),
    author: yup.string("Enter the author").required("Title is required"),
    checkoutDate: yup.date("Enter checkout date").required("Checkout date is required"),
    dueDate: yup.date("Enter due date").required("Due date is required"),
    // returnDate: yup.string("Enter returned date").required("Return date is required"),
    email: yup.string("Enter email address").email("Email is required"),
    phone: yup.number("Enter contact number").typeError('Enter a valid number'),
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
  const [borrower, setBorrower] = useState({
    userID: "",
    firstName: "",
    lastName: "",
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
        alert("Borrower added successfully");

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
        <TextField
          fullWidth
          id="userID"
          name="userID"
          label="User ID"
          value={formik.values.userID}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userID && Boolean(formik.errors.userID)}
          helperText={formik.touched.userID && formik.errors.userID}
        />

        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />

        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
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
        />

        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          type="number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Add;

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

import { backendUrl } from '../../data';


const useStyles = makeStyles((theme) => ({
  textField: {
    backgroundColor: 'white', // Background color
    borderRadius: '4px',
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'lightgray', // Border color
      },
      '&:hover fieldset': {
        borderColor: 'blue', // Hover border color
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green', // Focused border color
      },
    },
  },
}));


const validationSchema = yup.object({
  name: yup.string('Enter member name').required('Name is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  phone: yup.number('Enter a number').typeError('Enter a valid number'),
  // Add more validation rules for other fields if needed
});

// const apiUrl = backendUrl + 'user/add'

const addUserApi = async (userData) => {

  try {
    const response = await axios.post(`${backendUrl}user/add`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Add = ({handleClose, updateTrigger}) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: '',
    dob: '',
    email: '',
    password: '',
    phone: '',
    isAdmin: false,
    photoUrl: '',
  });

  const formik = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await addUserApi(values);
        alert('Member added successfully');

        handleClose()
        updateTrigger()
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert('Member already exists');
        } else {
          console.log(error);
          alert('Something went wrong, please try again');
        }
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>

        
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
          className={classes.textField} // Apply the styles here

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
          className={classes.textField} // Apply the styles here

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
          className={classes.textField} // Apply the styles here

        />

        {/* Add more fields here as needed */}

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Add;

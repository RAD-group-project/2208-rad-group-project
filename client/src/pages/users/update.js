import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

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
  name: yup.string('Enter user name').required('Name is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  phone: yup.number('Enter a number').typeError('Enter a valid number'),
});

const updateUserApi = async (userId, userData) => {
  try {
    const response = await axios.put(`${backendUrl}user/update/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Update = (data) => {

  const classes = useStyles();


  console.log(data['user']['row']['original']['_id'])
  const userId = data['user']['row']['original']['_id']
  const [user, setUser] = useState(data['user']['row']['original']);

  useEffect(() => {
  }, [userId]);

  const formik = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUserApi(userId, values);
        data.getAllUsers()
        data.handleClose()

      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert('User already exists');
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
          className={classes.textField}
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
          type="number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          className={classes.textField}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default Update;

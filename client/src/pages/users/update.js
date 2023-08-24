import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

import { backendUrl } from '../../data';

const validationSchema = yup.object({
  name: yup.string('Enter user name').required('Name is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  phone: yup.number('Enter a number').typeError('Enter a valid number'),
  // Add more validation rules for other fields if needed
});

const updateUserApi = async (userId, userData) => {
  try {
    const response = await axios.put(`${backendUrl}user/update/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Update = (data ) => {
  console.log(data['user']['row']['original']['_id'])
  const userId = data['user']['row']['original']['_id']
  // const [user, setUser] = useState({
  //   name: '',
  //   dob: '',
  //   email: '',
  //   password: '',
  //   phone: '',
  //   isAdmin: false,
  //   photoUrl: '',
  // });
  const [user, setUser] = useState(data['user']['row']['original']);

  useEffect(() => {
    // Fetch user data using the userId and update the user state
    // For example:
    // axios.get(`${backendUrl}user/get/${userId}`)
    //   .then(response => {
    //     setUser(response.data.user);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, [userId]);

  const formik = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUserApi(userId, values);
        // alert('User updated successfully');
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

        {/* Add more fields here as needed */}

        <Button color="primary" variant="contained" fullWidth type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default Update;

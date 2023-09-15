import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

import { backendUrl } from '../../data';

const useStyles = makeStyles((theme) => ({
  textField: {
    backgroundColor: 'white', 
    borderRadius: '4px',
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'lightgray', 
      },
      '&:hover fieldset': {
        borderColor: 'blue', 
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green', 
      },
    },
  },
}));


const validationSchema = yup.object({
  firstName: yup.string('Enter first name').required('First name is required'),
  lastName: yup.string('Enter last name').required('Last name is required'),
  nationality: yup.string('Enter nationality').required('Nationality is required'),
  dateOfBirth: yup.date('Enter date of birth').required('Date of Birth is required'),
  startDateOfPublishing: yup.string('Enter date published'),
  genre: yup.string('Enter the genres'),
  noOfBooksWritten: yup.string('Enter number').required('No. of books are required')
  
});


const addAuthorApi = async (authorData) => {
  try {
    const response = await axios.post(`${backendUrl}author/add`, authorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Add = ({handleClose, updateTrigger}) => {

  const classes = useStyles();

  const [author, setAuthor] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    dateOfBirth: '',
    startDateOfPublishing: '',
    genre:'',
    noOfBooksWritten: '',
  });

  const formik = useFormik({
    initialValues: author,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await addAuthorApi(values);

        handleClose()
        updateTrigger()
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert('Author already exists');
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
        id="firstName"
        name="firstName"
        label="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        className={classes.textField}
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
        className={classes.textField}
      />

      <TextField
        fullWidth
        id="nationality"
        name="nationality"
        label="Nationality"
        value={formik.values.nationality}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.nationality && Boolean(formik.errors.nationality)}
        helperText={formik.touched.nationality && formik.errors.nationality}
        className={classes.textField}
      />

      <TextField
        fullWidth
        id="dateOfBirth"
        name="dateOfBirth"
        label="Date of Birth"
        type="date"
        value={formik.values.dateOfBirth}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
        helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
        InputLabelProps={{ shrink: true }} 
        className={classes.textField}
      />

      <TextField
        fullWidth
        id="startDateOfPublishing"
        name="startDateOfPublishing"
        label="Start Date of Publishing"
        value={formik.values.startDateOfPublishing}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.startDateOfPublishing && Boolean(formik.errors.startDateOfPublishing)}
        helperText={formik.touched.startDateOfPublishing && formik.errors.startDateOfPublishing}
        className={classes.textField}
      />

<TextField
        fullWidth
        id="genre"
        name="genre"
        label="Genre"
        value={formik.values.genre}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.genre && Boolean(formik.errors.genre)}
        helperText={formik.touched.genre && formik.errors.genre}
        className={classes.textField}
      />

      <TextField
        fullWidth
        id="noOfBooksWritten"
        name="noOfBooksWritten"
        label="Number of Books written"
        value={formik.values.noOfBooksWritten}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.noOfBooksWritten && Boolean(formik.errors.noOfBooksWritten)}
        helperText={formik.touched.noOfBooksWritten && formik.errors.noOfBooksWritten}
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

import React, { useState } from 'react';
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
  category: yup.string('Enter the book type'),
  description: yup.string('Enter description')
  
});

const addGenreApi = async (bookgenre) => {
  try {
    const response = await axios.post(`${backendUrl}genre/add`, bookgenre);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Add = ({handleClose, updateTrigger}) => {
  const classes = useStyles();

  const [genre, setGenre] = useState({
    genre: false,
    copies: '',
  });

  const formik = useFormik({
    initialValues: genre,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await addGenreApi(values);
        alert('Genre added successfully');

        handleClose()
        updateTrigger()
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert('Genre already exists');
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
        id="category"
        name="category"
        label="Category"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        className={classes.textField} // Apply the styles here
      />

      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        value={formik.values.author}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.author && Boolean(formik.errors.author)}
        helperText={formik.touched.author && formik.errors.author}
        className={classes.textField} // Apply the styles here
      />

      
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Add;

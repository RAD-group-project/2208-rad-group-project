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
  category: yup.string('Enter category').required('Category is required'),
  description: yup.string('Enter description').required('Description is required'),
});

const updateGenreApi = async (genreId, genreData) => {
  try {
    const response = await axios.put(`${backendUrl}genre/update/${genreId}`, genreData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Update = (data ) => {

  const classes = useStyles();

  console.log(data['genre']['row']['original']['_id'])
  const genreId = data['genre']['row']['original']['_id']

  
  
  const [genre, setGenre] = useState(data['genre']['row']['original']);

  useEffect(() => {
    // Fetch book data using the bookId and update the book state
    // For example:
    // axios.get(`${backendUrl}book/get/${bookId}`)
    //   .then(response => {
    //     setBook(response.data.book);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, [genreId]);

  const formik = useFormik({
    initialValues: genre,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateGenreApi(genreId, values);
        // alert('Genre updated successfully');
        data.getAllGenres()
        data.handleClose()
        
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
        type="string"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        className={classes.textField} 
      />

      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        type="string"
        value={formik.values.author}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.author && Boolean(formik.errors.author)}
        helperText={formik.touched.author && formik.errors.author}
        className={classes.textField} 
      />

     
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Update;

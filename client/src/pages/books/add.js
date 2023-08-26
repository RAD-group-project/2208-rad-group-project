import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

import { backendUrl } from '../../data';


const validationSchema = yup.object({
  title: yup.string('Enter title').required('Title is required'),
  author: yup.string('Enter author').required('Author is required'),
  ISBN: yup.string('Enter ISBN').required('ISBN is required'),
  publisher: yup.string('Enter publisher'),
  datePublished: yup.date('Enter date published'),
  genre: yup.string('Enter genre'),
  copies: yup.number('Enter copies').required('No. of copies are required')
  
});

// const apiUrl = backendUrl + 'book/add'

const addBookApi = async (bookData) => {
  try {
    const response = await axios.post(`${backendUrl}book/add`, bookData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Add = ({handleClose, updateTrigger}) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    ISBN: '',
    publisher: '',
    datePublished: '',
    genre: false,
    copies: '',
  });

  const formik = useFormik({
    initialValues: book,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await addBookApi(values);
        alert('Book added successfully');

        handleClose()
        updateTrigger()
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert('Book already exists');
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
        id="publisher"
        name="publisher"
        label="Publisher"
        value={formik.values.publisher}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.publisher && Boolean(formik.errors.publisher)}
        helperText={formik.touched.publisher && formik.errors.publisher}
      />

      <TextField
        fullWidth
        id="datePublished"
        name="datePublished"
        label="Date Published"
        type="date"
        value={formik.values.datePublished}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.datePublished && Boolean(formik.errors.datePublished)}
        helperText={formik.touched.datePublished && formik.errors.datePublished}
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
      />

      <TextField
        fullWidth
        id="copies"
        name="copies"
        label="Copies"
        type="number"
        value={formik.values.copies}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.copies && Boolean(formik.errors.copies)}
        helperText={formik.touched.copies && formik.errors.copies}
      />


        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Add;

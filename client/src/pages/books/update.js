import React, { useState, useEffect } from 'react';
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

const updateBookApi = async (bookId, bookData) => {
  try {
    const response = await axios.put(`${backendUrl}book/update/${bookId}`, bookData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Update = (data ) => {
  console.log(data['book']['row']['original']['_id'])
  const bookId = data['book']['row']['original']['_id']

    // const [book, setBook] = useState({
    //   title: '',
    //   author: '',
    //   ISBN: '',
    //   publisher: '',
    //   datePublished: '',
    //   genre: false,
    //   copies: '',
    // });
  
  const [book, setBook] = useState(data['book']['row']['original']);

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
  }, [bookId]);

  const formik = useFormik({
    initialValues: book,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateBookApi(bookId, values);
        // alert('Book updated successfully');
        data.getAllBooks()
        data.handleClose()
        
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
        type="string"
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
        type="string"
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
        type="string"
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
        type="string"
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
        type="string"
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

export default Update;

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

import { backendUrl } from '../../data';

const validationSchema = yup.object({
    firstName: yup.string('Enter first name').required('First name is required'),
    lastName: yup.string('Enter last name').required('Last name is required'),
    nationality: yup.string('Enter nationality').required('Nationality is required'),
    dateOfBirth: yup.date('Enter date of birth').required('Date of Birth is required'),
    startDateOfPublishing: yup.string('Enter date published'),
    genre: yup.string('Enter the genres'),
    noOfBooksWritten: yup.number('Enter number').required('No. of books are required'), 
});

const updateAuthorApi = async (authorId, authorData) => {
  try {
    const response = await axios.put(`${backendUrl}author/update/${authorId}`, authorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Update = (data ) => {
  console.log(data['author']['row']['original']['_id'])
  const authorId = data['author']['row']['original']['_id']

    // const [book, setBook] = useState({
    //   title: '',
    //   author: '',
    //   ISBN: '',
    //   publisher: '',
    //   datePublished: '',
    //   genre: false,
    //   copies: '',
    // });
  
  const [author, setAuthor] = useState(data['author']['row']['original']);

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
  }, [authorId]);

  const formik = useFormik({
    initialValues: author,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateAuthorApi(authorId, values);
        // alert('Author updated successfully');
        data.getAllAuthors()
        data.handleClose()
        
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
        type="string"
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
        type="string"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />

      <TextField
        fullWidth
        id="nationality"
        name="nationality"
        label="Nationality"
        type="string"
        value={formik.values.nationality}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.nationality && Boolean(formik.errors.nationality)}
        helperText={formik.touched.nationality && formik.errors.nationality}
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
      />

      <TextField
        fullWidth
        id="startDateOfPublishing"
        name="startDateOfPublishing"
        label="Start Date of Publishing"
        type="string"
        value={formik.values.startDateOfPublishing}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.startDateOfPublishing && Boolean(formik.errors.startDateOfPublishing)}
        helperText={formik.touched.startDateOfPublishing && formik.errors.startDateOfPublishing} 
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
        id="noOfBooksWritten"
        name="noOfBooksWritten"
        label="Number of Books written"
        type="number"
        value={formik.values.noOfBooksWritten}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.noOfBooksWritten && Boolean(formik.errors.noOfBooksWritten)}
        helperText={formik.touched.noOfBooksWritten && formik.errors.noOfBooksWritten}
      />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Update;






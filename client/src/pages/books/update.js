import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button,TextField } from '@mui/material';

const validationSchema = yup.object({
  name: yup
    .string('Enter book name')
    .required('Name is required'),
});

const Update = () => {
  const formik = useFormik({
    initialValues: {
      name:'',
      author: '',
      isbn: '',
      copies: '',
      // date:''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
          id="author"
          name="author"
          label="author"
          
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
        />

        <TextField
          fullWidth
          id="isbn"
          name="isbn"
          label="ISBN"
          value={formik.values.isbn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.isbn && Boolean(formik.errors.isbn)}
          helperText={formik.touched.isbn && formik.errors.isbn}
        />

        <TextField
          fullWidth
          id="copies"
          name="copies"
          label="No. of Copies"
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

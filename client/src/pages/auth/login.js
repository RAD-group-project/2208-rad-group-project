import React from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from 'axios'
import { useAuth } from "../../hooks/useAuth";


export default function Login() {
  const { login, user } = useAuth();

  const loginUser = (email, password) => {

    axios.post(`http://localhost:8083/api/auth/login`, { email, password }, { withCredentials: false })
      .then((response) => {
        // handle success
        if (response.status === 200) {
          console.log(response.data);
          login(response.data.user);
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    })
    loginUser(data.get("email"), data.get("password"));
  };

  return (
    <Box
      sx={{
        my: 4,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5" style={{ fontSize: '35px' }}>
        Sign in
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
          <Grid item xs={12} sm={6} align="center" style={{ marginTop: "20px" }}>
            <Link to="/register" style={{textDecoration: "none"}}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
      </Box>
    </Box>
  )
}

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Login from "./login";
import { Route, Routes } from "react-router-dom";
import Register from "./register";
import { makeStyles } from "@mui/styles";

const backgroundImage = 'url("/img/library.jpeg")';

const useStyles = makeStyles((theme) => ({
  authContainer: {
    backgroundImage: backgroundImage,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  authBox: {
    width: "40%", // Smaller box width
    padding: "12px", // Replace with your desired pixel value
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff", // Solid white background
    borderRadius: "10px", // Rounded corners
  },
  heading: {
    fontSize: "50px",
    fontWeight: "bold", // Make it bold
    color: "#fff", // Make it white
    marginBottom: "16px", // Replace with your desired pixel value
    marginTop: "20px",
  },
}));

export default function Auth(props) {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div className={classes.authContainer}>
      <Container component="main" maxWidth="lg">

      <Typography className={classes.heading}>
        Library Website
      </Typography>
      <Box className={classes.authBox}>
        <CssBaseline />
        {props.login ? <Login /> : <Register />}
      </Box>
      </Container>
    </div>
  );
}

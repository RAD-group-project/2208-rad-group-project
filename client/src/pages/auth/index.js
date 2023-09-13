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

const backgroundImage = 'url("/your-image-path.jpg")'; // Replace with your image path

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
  authPaper: {
    width: "90%", // Smaller box width
    padding: "16px", // Replace with your desired pixel value
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "none",
    background: "transparent", // Semi-transparent white background
  },
  heading: {
    fontSize: "32px",
    marginBottom: "16px", // Replace with your desired pixel value
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
        <Paper className={classes.authPaper}>
          <Typography className={classes.heading}>Library Website</Typography>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            {props.login ? <Login /> : <Register />}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

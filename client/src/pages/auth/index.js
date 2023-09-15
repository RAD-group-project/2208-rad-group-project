import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Login from "./login";
import Register from "./register";
import { makeStyles } from "@mui/styles";

const backgroundImage = 'url("/img/library.jpeg")';

const useStyles = makeStyles((theme) => ({
  authPage: {
    backgroundImage: backgroundImage,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
  },
  authContainer: {
    display: "flex",
    // alignContent:"center",
    alignItems:"center",
    // flexWrap:"wrap-reverse",
    flexDirection:"column"

  },
  authBox: {
    width: "40%",
    padding: "12px", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff", 
    borderRadius: "10px", 
    boxShadow: '0 0 20px 2px #000000',

  },
  heading: {
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
    fontSize: "50px",
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: "40px", 
    marginTop: "70px",
    textAlign: 'center'
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
    <div className={classes.authPage} style = {{align: "center",}} >
      <Container component="main" maxWidth="lg" className={classes.authContainer} >

      <Typography className={classes.heading}>
        Library Management System
      </Typography>
      <Box className={classes.authBox} >
        <CssBaseline />
        {props.login ? <Login /> : <Register />}
      </Box>
      </Container>
    </div>
  );
}

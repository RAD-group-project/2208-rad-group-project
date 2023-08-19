const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

// Routes
const authRouter = require('./routes/authRouter');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((err) => console.error('Database Connection error', err));

app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

const initializePassport = require('./passport-config');
initializePassport(passport);

app.use('/api/auth', authRouter);

app.get('/', (req, res) => res.send('Welcome to Library Management System'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

// Initial Imports

const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

// Environment Variable

const { environment } = require('./config');
const isProduction = environment === 'production';

// Import Routes

const routes = require('./routes');

// Start Middleware

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware - see Readme Phase 0
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
)

// End Security Middleware

// Route Connections

app.use(routes);

// End Route Connections

// Start Error Handlers -- see Readme Phase 2

// 1. Catch and forward unhandled requests
app.use((req, res, next) => {
  const err = new Error("The requested resource could not be found.");
  err.title = "Resource not found";
  err.errors = ["The requested resource could not be found."];
  err.status = 404;
  next(err);
});

// 2. Process sequelize errors
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map(e => e.message);
    err.title = "Validation Error";
    err.status = 400;
  };

  if (!err.errors) {
    err.errors = [];
  }

  //console.log(err);

  if (err.title === 'Login failed') {
    res.status(401);
    res.json({
      message: "Invalid credentials",
      statusCode: 401
    })
  }
  if (err.errors.includes("Invalid email.") || err.errors.includes("Username is required.") || err.errors.includes("First Name is required.") || err.errors.includes("Last Name is required.")) {
    res.status(400);
    let validations = {};
    for (let message of err.errors) {
      if (message === "Invalid email.") {
        validations.email = message;
      } else if (message === "Username is required.") {
        validations.username = message;
      } else if (message === "First Name is required.") {
        validations.firstName = message;
      } else if (message === "Last Name is required.") {
        validations.lastName = message;
      }
    }
    result = {
      message: "Validation error",
      statusCode: 400,
      errors: validations
    }
    return res.json(result);
  }
  if (err.errors.includes("username must be unique")) {
    res.status(403);
    return res.json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        username: "User with that username already exists"
      }
    })
  } else if (err.errors.includes("email must be unique")) {
    res.status(403)
    return res.json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that email already exists"
      }
    })
  }
  if (err.errors.includes('Email or username is required.') || err.errors.includes('Password is required.')) {
    res.status(400);
    let validations = {};
    for (let message of err.errors) {
      if (message === 'Email or username is required.') {
        validations.credential = message;
      } else if (message === 'Password is required.') {
        validations.password = message;
      }
    }
    result = {
      message: "Validation error",
      statusCode: 400,
      errors: validations
    }
    return res.json(result);
  }
  next(err);
});

// 3. Format errors and return JSON
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  if (err.title === 'Unauthorized') {
    return res.json({
      message: "Authentication required",
      statusCode: err.status
    })
  }

  if (err.title === 'Validation Error') {
    res.status(400);
    let result = {};
    result.message = err.title;
    result.statusCode = err.status;
    result.errors = {};
    err.errors.forEach(error => {
      if (error === "Spot.address cannot be null") {
        result.errors.address = "Street address is required"
      }
      if (error === "Spot.city cannot be null") {
        result.errors.city = "City is required"
      }
      if (error === "Spot.state cannot be null") {
        result.errors.address = "State is required"
      }
      if (error === "Spot.country cannot be null") {
        result.errors.country = "Country is required"
      }
      if (error === "Spot.description cannot be null") {
        result.errors.description = "Description is required"
      }
      if (error === "Spot.price cannot be null") {
        result.errors.price = "Price per day is required"
      }
      if (error === "Validation min on lat failed" || error === "Validation max on lat failed") {
        result.errors.lat = "Latitude is not valid"
      }
      if (error === "Validation min on lng failed" || error === "Validation max on lng failed") {
        result.errors.lng = "Longitude is not valid"
      }
      if (error === "Validation len on name failed") {
        result.errors.name = "Name must be less than 50 characters"
      }
      if (error === "Review.review cannot be null") {
        result.errors.review = "Review text is required"
      }
      if (error === "Validation min on stars failed" || error === "Validation max on stars failed" || error.includes("is not a valid integer")) {
        result.errors.stars = "Stars must be an integer from 1 to 5"
      }
      if (error === "Startdate cannot conflict with other booking dates") {
        res.status(403);
        result.statusCode = 403;
        result.message = "Sorry, this spot is already booked for the specified dates"
        result.errors.startDate = "Start date conflicts with an existing booking"
      }
      if (error === "Enddate cannot conflict with other booking dates") {
        res.status(403);
        result.statusCode = 403;
        result.message = "Sorry, this spot is already booked for the specified dates"
        result.errors.endDate = "End date conflicts with an existing booking"
      }
      if (error === "End date cannot be on or before start date") {
        result.errors.endDate = "endDate cannot be on or before startDate"
      }
    })
    return res.json(result);
  }


  return res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

// End Error Handling

module.exports = app;

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
    err.title = "Validation error";
    err.status = 403;
  };
  next(err);
});

// 3. Format errors and return JSON
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

// End Error Handling

module.exports = app;

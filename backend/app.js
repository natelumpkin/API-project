// Initial Imports

const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

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

module.exports = app;

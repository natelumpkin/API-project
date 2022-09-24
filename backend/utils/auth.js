
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) }
  );

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('token', token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax'
  });

  return token;
}

// Verifies JWT's payload. If there are any issues, such as if user cannot be found
// or JWT is invalid, clear token cookie from response and set user to null
const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next()
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next()
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

// Prevents user who are not logged in from accessing the next function (usually a route)
const requireAuth = [ restoreUser, (req, res, next) => {
  if (req.user) return next();

  const err = new Error('Unauthorized');
  err.title = 'Unauthorized';
  err.errors = ['Unauthorized'];
  err.status = 401;
  return next(err);
}]

module.exports = { setTokenCookie, restoreUser, requireAuth };

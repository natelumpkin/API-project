const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in
router.post('/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err)
    }

    let token = await setTokenCookie(res, user);
    let result = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token
    }

    return res.json({
      ...result
    });
  }
);

// Log out
router.delete('/', (req, res) => {
  res.clearCookie('token');
  return res.json({message: "Successfully cleared login cookie"});
});

// Restore session user
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject()
    });
  } else return res.json({});
});

module.exports = router;

// Below is an example fetch request to log in a user
// Use a similar request to test the log in function

// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `iBM3Dt3U-cr-p2Lgf7uY5EiglIZygClWwqlM`
//   },
//   body: JSON.stringify({
//     credential: 'bigMagorgus',
//     password: 'password'
//   })
// }).then(res => res.json()).then(data => console.log(data));

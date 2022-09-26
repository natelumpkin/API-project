const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email.'),
  check('firstName')
    .exists({checkFalsy: true})
    .withMessage('First Name is required.'),
  check('lastName')
    .exists({checkFalsy: true})
    .withMessage('Last Name is required.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const router = express.Router();

// Sign up and create new user
router.post('/',
  validateSignup,
  async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const user = await User.signup({email, username, password, firstName, lastName});

  let token = await setTokenCookie(res, user);
  let result = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    token: token
  };

  return res.json({
    ...result
  });
});

module.exports = router;

// Below is an example fetch request to sign up a new user
// Use a similar request to test the sign up function

// fetch('/api/users', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `iBM3Dt3U-cr-p2Lgf7uY5EiglIZygClWwqlM`
//   },
//   body: JSON.stringify({
//     email: 'firestar@spider.man',
//     firstName: 'fire',
//     lastName: 'star',
//     username: 'Firestar2',
//     password: 'password'
//   })
// }).then(res => res.json()).then(data => console.log(data));

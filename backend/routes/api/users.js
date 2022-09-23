const express = require('express');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
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
  const { email, password, username } = req.body;
  const user = await User.signup({email, username, password});

  await setTokenCookie(res, user);

  return res.json({
    user
  });
});

module.exports = router;

// fetch('/api/users', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `PTzw7Ope-yll4l2-lJP8u56TpYpcqs8RqNJY`
//   },
//   body: JSON.stringify({
//     email: 'firesta33r@spider.man',
//     username: 'Firestar33',
//     firstName: 'fire',
//     lastName: 'star',
//     password: 'password'
//   })
// }).then(res => res.json()).then(data => console.log(data));

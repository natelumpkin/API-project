const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// all Route handlers will retrieve the current user on the req obj
// as req.user
// otherwise, set req.user to null
router.use(restoreUser);

// Below are old routehandlers for testing the authorization middleware
// See Authorize Me Readme Phase 3

// ------------ START OLD TESTS --------

// router.post('/test', (req, res) => {
//   res.json({requestBody:req.body});
// });

// router.get('/set-token-cookie', async (req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'bigMagorgus'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({user});
// });

// router.get('/restore-user', (req, res) => {
//   return res.json(req.user);
// });

// router.get('/require-auth', requireAuth, (req, res) => {
//   return res.json(req.user);
// });

// ------- END OLD TESTS -------








module.exports = router;
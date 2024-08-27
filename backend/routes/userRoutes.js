const router = require('express').Router();
const { signupUser, loginUser, googleSignup, googleLogin } = require('../controllers/userController');

// User signup route
router.post('/signup', signupUser);

// User login route
router.post('/login', loginUser);

// Google signup route
router.post('/googleSignup', googleSignup);

// Google login route
router.post('/googleLogin', googleLogin);

module.exports = router;

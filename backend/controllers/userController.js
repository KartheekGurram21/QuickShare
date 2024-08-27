const User = require('../models/userModel');
const axios = require('axios');

// Traditional User Signup
const signupUser = async (req, res) => {
    const { fname, lname, email, password } = req.body;

    try {
        const user = await User.signup(fname, lname, email, password);
        res.status(201).json({ fname, email });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

// Traditional User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        res.status(200).json({ fname: user.fname, email });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

// Google Signup
const googleSignup = async (req, res) => {
    console.log(req.body)
    const { access_token } = req.body.token;

    try { 
        
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const { sub: googleId, email, given_name: fname, family_name: lname } = response.data;

        let user = await User.findOne({ googleId });

        if (!user) {
            user = new User({ fname, lname, email, googleId });
            await user.save();
        }

        res.status(201).json({ fname, email });
    } catch (error) {
        console.error('Google signup failed:', error);
        res.status(500).json({ message: 'Google signup failed' });
    }
};

// Google Login
const googleLogin = async (req, res) => {
    const { access_token } = req.body.token; 

    try {
        
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        
        const { sub: googleId, email, given_name: fname, family_name: lname } = response.data || {};

        if (!email) {
            throw new Error('Email not found in Google response');
        }

        let user = await User.findOne({ googleId });

        if (!user) {
            user = new User({ fname, lname, email, googleId });
            await user.save();
        }

        res.status(200).json({ fname, email });
    } catch (error) {
        console.error('Google login failed:', error);
        res.status(500).json({ message: 'Google login failed' });
    }
};


module.exports = { signupUser, loginUser, googleSignup, googleLogin };
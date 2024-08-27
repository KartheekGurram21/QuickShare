const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true
  },
  lname: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; 
    }
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true 
  }
}, { timestamps: true });

userSchema.statics.signup = async function(fname, lname, email, password, googleId) {
  if (!fname || !lname || !email) {
    throw new Error('Please provide all required fields');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }

  if (password && !validator.isStrongPassword(password)) {
    throw new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number');
  }

  
  const userExists = await this.findOne({ email });
  if (userExists) {
    throw new Error('Email already in use');
  }

  let hashedPassword;
  if (password) {
    
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  
  const user = await this.create({
    fname,
    lname,
    email,
    password: hashedPassword,
    googleId
  });

  return user;
};

userSchema.statics.login = async function(email, password, googleId) {
  if (!email) {
    throw new Error('Please provide an email');
  }

  
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (googleId) {
    
    if (user.googleId !== googleId) {
      throw new Error('Invalid Google ID');
    }
    return user;
  }

  
  if (password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
  } else {
    throw new Error('Please provide a password');
  }

  return user;
};

module.exports = mongoose.model('Users', userSchema);

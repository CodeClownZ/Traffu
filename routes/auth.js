// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const Police = require('../models/Police');

//JWT Generate 
const TokenGen = (id) =>{
   return jwt.sign({id},process.env.Secret,{expiresIn:60*24*60*3*60});
}

// POST /api/register
router.post('/reg', async (req, res) => {
  const { name, nid, drivingLicense, carNumber, dob, password } = req.body;

  try {
    // Validate required fields
    if (!name || !nid || !drivingLicense || !carNumber || !dob || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { nid },
        { drivingLicense },
        { carNumber }
      ]
    });

    if (existingUser) {
      const field = existingUser.nid === nid ? 'NID' :
                   existingUser.drivingLicense === drivingLicense ? 'Driving License' : 'Car Number';
      return res.status(400).json({ message: `${field} is already registered.` });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      nid,
      drivingLicense: drivingLicense.toUpperCase(),
      carNumber: carNumber.toUpperCase(),
      dob: new Date(dob),
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: 'Registration successful!',
      user: {
        name: user.name,
        nid: user.nid,
        drivingLicense: user.drivingLicense,
        carNumber: user.carNumber
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
    try {
        const { nid, password } = req.body;

        // Check if NID and password are provided
        if (!nid || !password) {
            return res.status(400).json({ error: 'NID and password are required' });
        }

        // Find user by NID
        const user = await User.findOne({ nid });
        if (!user) {
            return res.status(401).json({ error: 'Invalid NID or password' });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid NID or password' });
        }
          const myCookie = TokenGen(user._id);
          res.cookie("traffu",myCookie,{httpOnly:true,maxAge:3*60*60*24*60});
        // Successful login
        res.status(200).json({ 
            success: true,
            message: 'Login successful',
            user: { nid: user.nid } // You can add more user data if needed
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// POST /reg/police - Register a new police officer
router.post('/reg/police', async (req, res) => {
  const { name, email, checkpost, rank, password } = req.body;

  // Validation
  if (!name || !email || !checkpost || !rank || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await Police.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Police officer with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new police officer
    const police = new Police({
      name,
      email,
      checkpost,
      rank,
      password: hashedPassword
    });

    await police.save();

    // Remove password from response
    const { password: _, ...policeWithoutPassword } = police.toObject();

    res.status(201).json({
      message: 'Police officer registered successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/police/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    // 2. Find user
    const police = await Police.findOne({ email: email.toLowerCase() });
    if (!police) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // 3. Check password
    const isValid = await bcrypt.compare(password, police.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

   const myCookie = TokenGen(police._id);
          res.cookie("police",myCookie,{httpOnly:true,maxAge:3*60*60*24*60});

    // 5. Send success
    res.json({
      success: true,
      message: 'Login successful',
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;
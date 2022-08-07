const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const {SECRETS}= process.env;
const auth = require('../middleware/staffAuth');
const { check, validationResult } = require('express-validator');

// Include staff User Middleware
const StaffUser = require('../models/staffUser');


// @route       GET /api/staffAuth
// @desc        Get logged in staff user
// @accees      Private
router.get('/', auth, async (req, res) => {
    // res.send('Get logged in staff');

    try {
        // Get staff user from db
        const staffUser = await StaffUser.findById(req.StaffUser.id).select('-password');
        res.json(staffUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route       POST /api/staffAuth
// @desc        Auth user staff & get token (staff logs in)
// @access      Public
router.post(
    '/', 
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        // res.send('Log in staff');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let staffUser = await StaffUser.findOne({ email });

            if (!staffUser) {
                return res.status(400).json({ msg: 'Invalid Credentials'});
            } 

            // If there's a user, chech password
            const isMatch = await bcrypt.compare(password, staffUser.password);

            if (!isMatch) {
                return res.status(400).json({msg: 'Invalid Credentials'});
            }

            // If it matches, send token
            const payload = {
                staffUser: {
                    id: staffUser.id
                }
            }

            jwt.sign(
                payload,
                SECRETS,
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
);


// Export 
module.exports = router;
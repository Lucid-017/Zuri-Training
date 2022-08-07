const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const {SECRETS}= process.env;

const { check, validationResult } = require('express-validator');

// Include Student User model
const StaffUser = require('../models/staffUser');


// @route       POST /api/users/studentUsers
// @desc        Register a student user
// @accees      Public
router.post(
    '/', 
    [
        check('firstName', 'Please add first name')
            .not()
            .isEmpty(),
        check('lastName', 'Please add last name')
            .not()
            .isEmpty(),
        check('email', 'Please add a valid email').isEmail(),
        check('password', 'Please enter a valid password with 6 or more characters')
            .isLength({ min: 6 })
    ], 
    async (req, res) => {
        // res.send('Student registered!');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName,lastName , email, password } = req.body;

        try {
            // Check to see if there's a user with particular email
            let staffUser = await StaffUser.findOne({ email });

            if (staffUser) {
                return res.status(400).json({ msg: 'This student exists already!'});
            }

            staffUser = new StaffUser({
                firstName,
                lastName,
                email,
                password
            });

            // Encrypt password with bcrypt
            const salt = await bcrypt.genSalt(10);

            staffUser.password = await bcrypt.hash(password, salt);

            await staffUser.save();

            // Send response
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
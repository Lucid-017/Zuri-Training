const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {v4: uuid} = 'uuid';
require('dotenv').config()
const {SECRETS}= process.env;

// const auth = require('../middleware/adminAuth');
const { check, validationResult } = require('express-validator');

// Include Student User model
const ManagerUser = require('../models/managerUser');
const AdminUser = require('../models/adminUser');

// @route       POST /api/users/manager
// @desc        Register manager user
// @accees      Public
router.post(
    '/', 
    [
        check('name', 'Please add name')
            .not()
            .isEmpty(),
        check('email', 'Please add a valid email').isEmail(),
        check('password', 'Please enter a valid password with 6 or more characters')
            .isLength({ min: 6 }),
    ], 
    async (req, res) => {
        // res.send('Student registered!');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, isAdmin, isActive } = req.body;

        try {
            // Check to see if there's a user with particular email
            let managerUsers = await ManagerUser.findOne({ email });

            if (managerUsers) {
                return res.status(400).json({ msg: 'This manager exists already!'});
            }

            managerUsers = new ManagerUser({
                name,
                email,
                password,
                isAdmin,
                isActive
            });

            // Encrypt password with bcrypt
            const salt = await bcrypt.genSalt(10);

            managerUsers.password = await bcrypt.hash(password, salt);

            await managerUsers.save();

            // Send response
            const payload = {
                managerUsers: {
                    id: managerUsers.id
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
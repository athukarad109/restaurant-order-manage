const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../Models/userSchema');

const router = express.Router();

dotenv.config();

const jwt_secret = process.env.JWT_SECRET

router.get('/', (req, res) => {
    res.send("User route");
})

router.post('/create', async(req, res) => {
    try {
        const { username, password } = req.body;
        let salt = await bcrypt.genSalt(10);
        let hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username: username,
            password: hashedPass
        })
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        const thisUser = await User.findOne({ "username": username });

        if (!thisUser) {
            return res.status(404).json({ 'error': 'Cannot find' });
        }

        const isPass = await bcrypt.compare(password, thisUser.password);

        if (!isPass) {
            return res.status(401).json({ 'error': 'Unauthorized' });
        }

        let user = {
            id: thisUser._id
        }

        const token = jwt.sign(user, jwt_secret);
        res.json({ token });

    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router;
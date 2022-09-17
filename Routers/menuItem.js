const express = require('express');
const Menu = require('../Models/menuSchema')
const User = require('../Models/userSchema')
const auth = require('../Middleware/authenticate');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Menu item router");
})

router.post('/create', auth, async(req, res) => {
    let loggedinuser = req.user;
    try {

        const admin = await User.findById(loggedinuser.id);

        if (admin === null) {
            return res.status(401).json({ 'erro': 'Not authorized' });
        }

        const { title, description, catagory, price } = req.body;
        const newMenu = await Menu.create({
            title: title,
            description: description,
            catagory: catagory,
            price: price
        })
        res.json(newMenu);
    } catch (error) {
        res.status(500).json({ error })
    }

})

router.get('/getAll', async(req, res) => {
    try {
        const menuItems = await Menu.find({});
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error })
    }

})

router.put('/edit/:id', auth, async(req, res) => {
    let loggedinuser = req.user;
    try {

        const admin = await User.findById(loggedinuser.id);

        if (admin === null) {
            return res.status(401).json({ 'erro': 'Not authorized' });
        }


        const id = req.params.id
        const { title, description, catagory, price } = req.body;
        let newMenu = {};
        if (title) {
            newMenu.title = title
        }
        if (description) {
            newMenu.description = description
        }
        if (catagory) {
            newMenu.catagory = catagory
        }
        if (price) {
            newMenu.price = price
        }

        const thisMenu = await Menu.findById(id);
        if (!thisMenu) {
            return res.status(404).json({ "error": "Does not exists" })
        }

        const updateMenu = await Menu.findByIdAndUpdate(id, newMenu);

        res.json({ updateMenu });

    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/delete/:id', auth, async(req, res) => {
    let loggedinuser = req.user;
    try {
        const admin = await User.findById(loggedinuser.id);

        if (admin === null) {
            return res.status(401).json({ 'erro': 'Not authorized' });
        }

        const id = req.params.id
        const thisMenu = await Menu.findById(id);
        if (!thisMenu) {
            return res.status(404).json({ "error": "Does not exists" })
        }
        const deleted = await Menu.findByIdAndDelete(id);
        res.json({ deleted })

    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router;
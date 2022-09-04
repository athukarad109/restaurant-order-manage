const express = require('express');
const Menu = require('../Models/menuSchema')

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Menu item router");
})

router.post('/create', async(req, res) => {
    try {
        const { title, description, catagory } = req.body;
        const newMenu = await Menu.create({
            title: title,
            description: description,
            catagory: catagory
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

router.put('/edit/:id', async(req, res) => {
    try {
        const id = req.params.id
        const { title, description, catagory } = req.body;
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

router.delete('/delete/:id', async(req, res) => {
    try {
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
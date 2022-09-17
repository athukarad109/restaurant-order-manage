const express = require('express');
const Order = require('../Models/orderSchema');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('order');
})

router.post('/create', async(req, res) => {
    try {
        const { order, total, status, table } = req.body

        const newOrder = await Order.create({
            order: order,
            total: total,
            status: status,
            table: table
        })

        res.json({ newOrder });

    } catch (error) {
        res.status(500).json({ error });
    }
})


module.exports = router
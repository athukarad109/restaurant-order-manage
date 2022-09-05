const express = require('express');
const cors = require('cors');
const menuItem = require('./Routers/menuItem');
const user = require('./Routers/user');
const order = require('./Routers/order');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

const uri = "mongodb://localhost:27017/restaurant";

mongoose.connect(uri, () => {
    console.log("Connected to db")
})

app.use(express.json())

const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use('/menu', menuItem);
app.use('/user', user);
app.use('/order', order);

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
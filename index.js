const express = require('express');
const cors = require('cors');

const MongoClient = require("mongodb").MongoClient;

const Order = require('./apiMethods/Order');

const { body } = require('express-validator');

const app = express();
app.use(express.json());

const dbClient = new MongoClient("mongodb+srv://aryan:<password>@cluster0.39ko8.azure.mongodb.net/mySecondDatabase?retryWrites=true&w=majority",{useUnifiedTopology: true});
dbClient.connect();

app.post(
    '/order',
    body('first_name').isString().isLength({ min: 1, max: 50}),
    body('last_name').isString().isLength({ min: 1, max: 50}),
    body('phone_number').isMobilePhone().isLength({ min:10, max: 10 }),
    body('product_id').isInt().not().isString(),
    (req, res) => {
     Order.createOrder(req, res, dbClient.db("mySecondDatabase"))
    }
);

app.listen(3000, () => console.log("Server is running on port 3000"));

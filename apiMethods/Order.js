const Order = require('../models/Order');
const User = require('../models/User');

const { validationResult } = require('express-validator');

const createOrder = async(req, res, database) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        product = await database.collection("Products").findOne({product_id: req.body.product_id});
        if (!product) {
            console.log("Product Id does not exist");
            return res.status(400).json({message: "Product Id does not exist"});
        }

        user = await database.collection("Users").findOne({first_name: req.body.first_name, last_name: req.body.last_name});
        if (!user) {
            const userObject = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number
            });
            try {
                newUser = await database.collection("Users").insertOne(userObject);
            } catch(err) {
                console.log("User could not be found and created");
                return res.status(400).json({message: "User could not be found and created"});
            }
        }

        const order = new Order({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            product_id: req.body.product_id
        })
        result = await database.collection("Orders").insertOne(order);
        return res.status(200).json({message: "Order has been created successfully!"});

    } catch(err) {
        console.log(err);
        return res.status(400).json({message: err});
    }
}

module.exports = {
    createOrder: createOrder
};
const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')
router.post('/orderData', async(req, res) => {
        try {
            let data = req.body.order_data;
            data.splice(0, 0, { Order_date: req.body.order_date });

            let eId = await Order.findOne({ 'email': req.body.email });

            if (eId === null) {
                await Order.create({
                    order_data: [data],
                    email: req.body.email

                });
                res.status(200).json({ success: true }); // 201 Created for successful creation
            } else {
                await Order.findOneAndUpdate({ 'email': req.body.email }, { $push: { order_data: data } }, { upsert: true });
                res.json({ success: true });
            }
        } catch (error) {
            console.error('Error in /api/orderData:', error);
            res.status(500).send("Server Error: " + error.message);


        }
    }

)
router.post('/myOrderData', async(req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
            //console.log(eId)
        res.json({ orderData: eId })
    } catch (error) {
        res.send("Error", error.message)
    }
});
module.exports = router;
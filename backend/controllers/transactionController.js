import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';

import Order from '../models/orderModel.js';

dotenv.config();

let snap = new midtransClient.Snap({
    isProduction: false, 
    serverKey: process.env.MIDTRANS_SERVER_KEY
})

// Create a new transaction in Midtrans
export const createTransaction = async (req, res) => {
    const { orderID, amount, itemDetails, customerDetails } = req.body;
    // console.log(req.body)

    let transactionParamaters = {
        transaction_details: {
            order_id: orderID,
            gross_amount: amount
        },
        item_details: itemDetails,
        customer_details: customerDetails
    }
    console.log(transactionParamaters)

    try {
        // create transaction to midtrans snap
        let transaction = await snap.createTransaction(transactionParamaters);

        // Sending token result to frontend
        res.json({
            token: transaction.token,
            redirect_url: transaction.redirect_url
        })
    } catch (error) {
        console.error('Midtrans Transaction Failed: ' + error.message)
        res.status(500).json({ message: 'Failed to create transaction' })
    }
}

// Handle transaction notification from midtrans through webhook
export const handleNotification = async (req, res) => {
    const {status_code, order_id, gross_amount, currency, payment_type} = req.body;

    if (status_code === 200) {
        await Order.deleteMany({})
        await Order.create({
            orderId: order_id,
            gross_amount,
            payment_type,
            currency
        })
    }

    res.status(200).json({
        status: 'success',
        message: 'OK'
    })
}
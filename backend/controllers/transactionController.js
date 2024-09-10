import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';

dotenv.config();

let snap = new midtransClient.Snap({
    isProduction: false, 
    serverKey: process.env.MIDTRANS_SERVER_KEY
})

export const index = async (req, res) => {
    const { orderID, amount, itemDetails, customerDetails } = req.body;

    let transactionParamaters = {
        transaction_details: {
            order_id: orderID,
            gross_amount: amount
        },
        item_details: [itemDetails],
        customer_details: customerDetails
    }

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
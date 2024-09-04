import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    image: String
})

export default mongoose.model('Cart', cartSchema)
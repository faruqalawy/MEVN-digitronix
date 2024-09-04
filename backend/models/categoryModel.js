import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    features: [String]
});

const categorySchema = new mongoose.Schema({
    name: String,
    image: String,
    products: [productSchema]
})

export default mongoose.model('Category', categorySchema)
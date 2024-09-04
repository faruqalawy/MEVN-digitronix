import mongoose from "mongoose";
import Cart from "../models/cartModel.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB: " + err))

async function seed() {
    const carts = [
        {
          "name": "4K Action Camera",
          "price": 2000000,
          "quantity": 3,
          "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-2"
        },
        {
          "name": "Robot Vacuum Cleaner",
          "price": 4000000,
          "quantity": 5,
          "image": "https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/product-4"
        }
      ]

      try {
        const cartCount = await Cart.countDocuments();
        if (cartCount > 0) {
            console.log("Data carts sudah ada, mencatat ulang...");
            await Cart.deleteMany({});
        }
        await Cart.insertMany(carts)
      } catch (error) {
        console.log("Terjadi kesalahan saat menyimpan data carts: " + error.message)
      } finally {
        mongoose.connection.close();
        console.log("Data carts berhasil disimpan");
      }
}

seed();
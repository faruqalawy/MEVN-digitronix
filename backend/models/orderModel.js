import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true }, // Custom order ID
  time: { type: Date, default: Date.now }, // Automatically sets the current date
  gross_amount: { type: Number, required: true },
  payment_type: { type: String, required: true },
  currency: { type: String, default: "IDR" }, // Set default currency to IDR
});

export default mongoose.model("Order", orderSchema);

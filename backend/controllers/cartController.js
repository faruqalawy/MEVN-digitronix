import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";

export const index = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("carts");
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user.carts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving carts: " + error.message });
  }
};

export const store = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const user = await User.findById(req.user._id).populate("carts");
    const existingCartItem = user.carts.find((cart) => cart.name === name);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json(existingCartItem);
    } else {
      const newCart = new Cart(req.body);
      await newCart.save();

      user.carts.push(newCart);
      await user.save();

      res.status(201).json(newCart);
    }
  } catch (error) {
    return res.status(500).json("Error saving: ", error.message);
  }
};

export const destroy = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { cart_id } = req.params;
    await User.findByIdAndUpdate(user._id, { $pull: { carts: cart_id } });
    await Cart.findByIdAndDelete(cart_id);

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    return res.status(500).json("Error deleting:", error.message);
  }
};

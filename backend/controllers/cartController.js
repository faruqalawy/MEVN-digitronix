import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";

export const index = async (req, res) => {
  try {
    // if (!req.user) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
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
    const user = await User.findById(req.user._id);
    const newCart = new Cart(req.body);
    await newCart.save();

    user.carts.push(newCart);
    await user.save();

    res.status(201).json(newCart);
  } catch (error) {
    return res.status(500).json("Error saving: " + error.message);
  }
};

export const update = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { item_id } = req.params;

    const cartItem = await Cart.findById(item_id);
    if (!cartItem) return res.status(404).send("Item not found");

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: "Item saved successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error updating quantity: " + error.message });
  }
};

export const destroy = async (req, res) => {
  try {
    // if (!req.user) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    const { item_id } = req.params;
    if (!item_id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found");

    // Ensure the user has the item in their cart
    if (!user.carts.includes(item_id)) {
      return res.status(404).send("Item not found in user's cart");
    }

    await User.findByIdAndUpdate(user._id, { $pull: { carts: item_id } });
    await Cart.findByIdAndDelete(item_id);

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    return res.status(500).json("Error deleting: " + error.message);
  }
};

export const destroyAll = async (req, res) => {
  try {
    // if (!req.user) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    const user = await User.findById(req.user._id).populate('carts');
    if (!user) return res.status(404).send("User not found");

    // Clear all cart the user has
    await Cart.deleteMany({_id: { $in: user.carts}});

    // Delete all cart id in the cars array
    user.carts = [];
    await user.save();

    res.status(200).json({ message: "Carts deleted successfully" });
  } catch (error) {
    return res.status(500).json("Error deleting: " + error.message);
  }
}


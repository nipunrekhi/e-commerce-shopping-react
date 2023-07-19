import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js"; // Assuming the Cart model is imported correctly
import ProductAttribute from "../models/attributeModel.js";
import Variant from "../models/variantModel.js";
const addToCart = asyncHandler(async (req, res) => {
  const {
    userId,
    productId,
    name,
    price,
    quantity,
    image,
    variant,
    attribute,
  } = req.body;
  
  // User is logged in, save the data in the database
  try {
    // Check if the cart item already exists for the user and product
    const existingItem = await Cart.findOne({ productId, variant, attribute ,userId});
    if (existingItem) {
      // Update the quantity if the item already exists
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      // Create a new cart item
      await Cart.create({
        userId,
        productId,
        name,
        price,
        image,
        quantity,
        variant,
        attribute,
      });
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    // Handle any errors that occur during database operations
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const showCartProducts = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      const userId = process.env.IP_ADDRESS;
      const cartItems = await Cart.find({ userId });
      const attributeIds = cartItems.map((item) => item.attribute);
      const variantIds = cartItems.map((item) => item.variant);
      // Fetch attribute data
      const attribute = await ProductAttribute.find(
        { _id: { $in: attributeIds } },
        { size: 1, _id: 1 }
      );
      // Fetch variant data
      const variant = await Variant.find(
        { _id: { $in: variantIds } },
        { color: 1, _id: 1 }
      );
      // Combine the attributes and variants with cart items
      const combinedData = cartItems.map((item) => {
        return {
          ...item.toObject(),
          attribute: attribute.find((attr) => attr._id.equals(item.attribute)),
          variant: variant.find((varnt) => varnt._id.equals(item.variant)),
        };
      });
      // Return the combined data
      res.status(200).json(combinedData);
    } else {
      const userId = req.user._id; // Assuming the user ID is passed as a route parameter
      // Retrieve the cart data for the user
      const cartItems = await Cart.find({ userId });
      const attributeIds = cartItems.map((item) => item.attribute);
      const variantIds = cartItems.map((item) => item.variant);
      // Fetch attribute data
      const attribute = await ProductAttribute.find(
        { _id: { $in: attributeIds } },
        { size: 1, _id: 1 }
      );
      // Fetch variant data
      const variant = await Variant.find(
        { _id: { $in: variantIds } },
        { color: 1, _id: 1 }
      );
      // Combine the attributes and variants with cart items
      const combinedData = cartItems.map((item) => {
        return {
          ...item.toObject(),
          attribute: attribute.find((attr) => attr._id.equals(item.attribute)),
          variant: variant.find((varnt) => varnt._id.equals(item.variant)),
        };
      });
      // Return the combined data
      res.status(200).json(combinedData);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const incrementItem = asyncHandler(async (req, res) => {
  try {
    const itemId = req.params.id;
    const cartItem = await Cart.findById(itemId);

    if (!cartItem) {
      // Handle case when item is not found
      return res.status(404).json({ message: "Item not found" });
    }
    cartItem.quantity += 1; // Increment the quantity
    const updatedCartItem = await cartItem.save();
    res.status(200).json(updatedCartItem);
  } catch (error) {
    // Handle error
    res.status(500).json({ message: "Internal server error" });
  }
});
const decrementItem = asyncHandler(async (req, res) => {
  try {
    const itemId = req.params.id;
    const cartItem = await Cart.findById(itemId);
    if (!cartItem) {
      // Handle case when item is not found
      return res.status(404).json({ message: "Item not found" });
    }
    if (cartItem.quantity === 1) {
      // Quantity is already 1, no need to decrement
      return res.status(200).json(cartItem);
    }
    cartItem.quantity -= 1; // Decrement the quantity
    const updatedCartItem = await cartItem.save();
    res.status(200).json(updatedCartItem);
  } catch (error) {
    // Handle error
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  try {
    const itemId = req.params.id;
    const cartItem = await Cart.findById(itemId);
    if (!cartItem) {
      // Handle case when item is not found
      return res.status(404).json({ message: "Item not found" });
    }
    await Cart.deleteOne({ _id: cartItem._id }); // Delete the Item
    res.status(200).send({ message: "Data deleted Successfully" });
  } catch (error) {
    // Handle error
    res.status(500).json({ message: "Internal server error" });
  }
});
const deleteCartAfterPurchase = async (req, res) => {
  try {
    const userId = req.params.id;
    const cart = await Cart.find({ userId });
    await Cart.deleteMany({ userId });
    res.status(200).json({ success: true, deletedCart: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  addToCart,
  showCartProducts,
  incrementItem,
  decrementItem,
  deleteItem,
  deleteCartAfterPurchase,
};

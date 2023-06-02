import { mongoose } from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type:String, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  quantity: {
    type: Number,
  },
  attribute:{
    type:String
  },
  variant:{
    type:String
  }
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

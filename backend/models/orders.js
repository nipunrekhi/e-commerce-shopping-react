
import { mongoose } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    customerId:{type:String},
    paymentIntentId:{type:String},
    products: [
      {
        _id: { type: String },
        productId: { type: String },
        name: { type: String },
        price: { type: String },
        image: { type: String },
        quantity: { type: String },
      },
    ],
    subTotal: { type: Number, required: true },
    deliveryStatus: { type: String, default: "pending" },
    paymentStatus: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

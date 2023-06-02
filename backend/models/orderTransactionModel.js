import { mongoose } from "mongoose";

const orderTransactionSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true },
    name: { type: String, requiired: true },
    email: { type: String, requiired: true },
    phoneNo: { type: Number, requiired: true },
    subTotal: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const OrderTransaction = mongoose.model(
  "OrderTransaction",
  orderTransactionSchema
);
export default OrderTransaction;

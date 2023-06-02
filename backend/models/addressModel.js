import { mongoose } from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: {
    type:String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  houseNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
});

const OrderAddress = mongoose.model("Address", addressSchema);
export default OrderAddress;

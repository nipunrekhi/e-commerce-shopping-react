import { mongoose } from "mongoose";

const promocodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  promocode: { type: String, required: true, ref: "AssignPromo" },
  discount: { type: String, required: true },
  expiryDate: {
    type: Date,
  },
});

const Promocode = mongoose.model("Promocode", promocodeSchema);
export default Promocode;

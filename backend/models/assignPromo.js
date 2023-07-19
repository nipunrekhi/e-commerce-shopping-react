import {mongoose} from "mongoose"

const assignPromoSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  promocodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promocode",
    required: true,
  },
  promocodeName: {
    type: String,
  },
});
const AssignPromo=mongoose.model("AssignPromo",assignPromoSchema)
export default AssignPromo;
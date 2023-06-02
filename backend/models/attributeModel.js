import { mongoose } from "mongoose";

const attributeSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  size: {
    type: String,
    required: true,
  },
});

const ProductAttribute = mongoose.model("Attribute", attributeSchema);
export default ProductAttribute;

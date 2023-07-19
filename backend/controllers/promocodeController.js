import asyncHandler from "express-async-handler";
import Promocode from "../models/promocodeModel.js";
import AssignPromo from "../models/assignPromo.js";
import Cart from "../models/cartModel.js";
const addPromocode = asyncHandler(async (req, res) => {
  try {
    const { name, promocode, discount } = req.body;
    const promo = new Promocode({
      name,
      promocode,
      discount,
    });
    const createdPromo = await promo.save();
    return res.status(201).json(createdPromo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const showPromocodes = asyncHandler(async (req, res) => {
  try {
    const promos = await Promocode.find({});
    return res.status(200).json(promos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const assignPromo = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const { promo, userId } = req.body;

    const assign = await AssignPromo.create({
      userId,
      promocodeId: promo._id,
      promocodeName: promo.name,
    });
    return res.status(200).json(assign);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const applyPromo = asyncHandler(async (req, res) => {
  try {
    const { promoName } = req.body;
    const promocode = await Promocode.findOne({ promocode: promoName });
    
    if (!promocode) {
      return res.status(404).json({ message: "Promo code not found" });
    }
     
    const assignPromo = await AssignPromo.find({ promocodeId: promocode._id });

    if (assignPromo.length === 0) {
      return res.status(404).json({ message: "No assigned promo found" });
    }

    const cartItems = await Cart.find({ userId: assignPromo[0].userId });
    let totalPrice = cartItems.reduce((total, item) => {
      const price = item?.price || 0;
      const quantity = item?.quantity || 0;
      return total + price * quantity;
    }, 0);

    // Apply the discount
    const discount = (totalPrice * promocode.discount) / 100;
    totalPrice -= discount;
    return res.json({ totalPrice, discount });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


export { addPromocode, showPromocodes, assignPromo, applyPromo };

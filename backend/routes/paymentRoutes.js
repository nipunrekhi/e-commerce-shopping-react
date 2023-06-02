import * as paymentController from "../controllers/paymentController.js";
import express from "express";
import bodyParser from "body-parser";

const router = express.Router();
//Payment Routes
router.post("/create-checkout-session", paymentController.generateClientSecret);
router.post("/orderAddress", paymentController.orderAddress);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.webhook
);
export default router;

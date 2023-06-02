import express from "express";
import * as userController from "../controllers/userController.js";
import * as productController from "../controllers/productController.js";
import * as cartController from "../controllers/cartController.js";
import authenticateJWT from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

//User Routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/userProfile", authenticateJWT, userController.getUserProfile);
router.get("/reqIp", userController.getIpAddress);
router.post("/signInGuest", userController.signInAsGuest);

//Products routes
router.post(
  "/addProduct",
  upload.single("image"),
  productController.addProducts
);
router.post(
  "/addCategory",
  upload.single("image"),
  productController.addCategory
);
router.post(
  "/addVariant",
  upload.single("image"),
  productController.addVariant
);
router.post("/addAttributes", productController.addAttributes);
router.get(
  "/getProducts/:categoryId",
  express.static("uploads"),
  productController.getProducts
);
router.get(
  "/showProduct/:productId",
  express.static("uploads"),
  productController.showProduct
);
router.get("/productDropdown", productController.productsDropdown);
router.get(
  "/getCategory",
  express.static("uploads"),
  productController.getCategory
);
router.get(
  "/categories/tree",
  express.static("uploads"),

  productController.getCategoryTree
);
router.get(
  "/getVariants/:productId",
  express.static("uploads"),
  productController.getVariants
);
router.get("/showAttribute/:productId", productController.showAttribute);

//Cart Routes
router.post("/addToCart", upload.single("image"), cartController.addToCart);
router.post("/increment/:id", cartController.incrementItem);
router.post("/decrement/:id", cartController.decrementItem);
router.post("/deleteItem/:id", cartController.deleteItem);
router.get("/showCartItems", authenticateJWT, cartController.showCartProducts);
router.delete("/delete/:id", cartController.deleteCartAfterPurchase);

export default router;

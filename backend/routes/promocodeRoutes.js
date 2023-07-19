
import express from "express"
import * as promocodeController from "../controllers/promocodeController.js"

const router=express.Router()

router.post("/addPromocode",promocodeController.addPromocode)
router.get("/showPromocodes", promocodeController.showPromocodes);
router.post("/assignPromo", promocodeController.assignPromo);
router.post("/applyPromo", promocodeController.applyPromo);
export default router;


import express from "express";
import ProductController from "../Controller/productcontroller.js";
import { upload } from "../middleware/auth.js";

// import { router } from "express";
const router=express.Router();

router.get("/",ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/",upload, ProductController.addProduct);
router.delete("/:id",ProductController.deleteProductById);
router.patch("/:id",ProductController.updateProductById);

export default router;
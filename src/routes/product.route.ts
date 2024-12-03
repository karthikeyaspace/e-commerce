import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();
const productController = new ProductController();

router.get("/:id", productController.getProduct.bind(productController));
router.post("/", productController.createProduct.bind(productController));
router.put("/", productController.updateProduct.bind(productController));
router.get(
  "/stock/all-products",
  productController.getStock.bind(productController)
);

export default router;

import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const router = Router();
const orderController = new OrderController();

router.get("/:id", orderController.getOrder);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.get("/recent/:days", orderController.getRecentOrders);
router.get("/user/:id", orderController.getUserOrders);
router.get("/product/:id", orderController.getProductOrders);

export default router;

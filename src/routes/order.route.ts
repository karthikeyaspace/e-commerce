import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const router = Router();
const orderController = new OrderController();

router.get("/:id", orderController.getOrder.bind(orderController));
router.post("/", orderController.createOrder.bind(orderController));
router.put("/", orderController.updateOrder.bind(orderController));
router.get("/recent/:days", orderController.getRecentOrders.bind(orderController));
router.get("/user/:id", orderController.getUserOrders.bind(orderController));
router.get("/product/:id", orderController.getProductOrders.bind(orderController));

export default router;
 
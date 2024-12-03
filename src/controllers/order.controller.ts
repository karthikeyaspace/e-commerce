import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { OrderTypes } from "../types";

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }
  // /order/:id
  public async getOrder(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrder(id);
      return res.send({ success: true, data: order });
    } catch (error) {
      return res.send({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  // /order
  public async createOrder(req: Request, res: Response): Promise<any> {
    try {
      const order = req.body as OrderTypes;
      const newOrder = await this.orderService.createOrder(order);
      return res.send({
        success: true,
        message: "Order created",
        data: newOrder,
      });
    } catch (error) {
      return res.send({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  // /order
  public async updateOrder(req: Request, res: Response): Promise<any> {
    try {
      const order = req.body as OrderTypes;
      const updatedOrder = await this.orderService.updateOrder(order);
      return res.send({
        success: true,
        message: "Order updated",
        data: updatedOrder,
      });
    } catch (error) {
      return res.send({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  // /order/recent/:days
  public async getRecentOrders(req: Request, res: Response): Promise<any> {
    try {
      const { days } = req.params;
      const orders = await this.orderService.getRecentOrders(Number(days));
      return res.send({ success: true, data: orders });
    } catch (error) {
      return res.send({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  // /order/user/:id
  public async getUserOrders(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const orders = await this.orderService.getUserOrders(id);
      if (!orders.length) {
        return res.send({ success: false, message: "No orders found" });
      }
      return res.send({ success: true, data: orders });
    } catch (error) {
      return res.send({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  // /order/product/:id
  public async getProductOrders(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const orders = await this.orderService.getProductOrders(id);
      return res.send({ success: true, data: orders });
    } catch (error) {
      return res.send({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
}

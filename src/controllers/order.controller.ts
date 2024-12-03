import { Request, Response } from "express";

export class OrderController {
  public async getOrder(req: Request, res: Response): Promise<void> {
    res.send("Get order by id");
  }

  public async createOrder(req: Request, res: Response): Promise<void> {
    res.send("Create order");
  }

  public async updateOrder(req: Request, res: Response): Promise<void> {
    res.send("Update order by id");
  }

  public async getRecentOrders(req: Request, res: Response): Promise<void> {
    res.send("Get recent orders of last n days");
  }

  public async getUserOrders(req: Request, res: Response): Promise<void> {
    res.send("Get orders by user id");
  }

  public async getProductOrders(req: Request, res: Response): Promise<void> {
    res.send("Get orders by product id");
  }
}

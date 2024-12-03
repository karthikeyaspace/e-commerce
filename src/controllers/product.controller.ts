import { Request, Response } from "express";

export class ProductController {
  async getProduct(req: Request, res: Response) {
    res.send("Get product by id");
  }

  async createProduct(req: Request, res: Response) {
    res.send("Create product");
  }

  async updateProduct(req: Request, res: Response) {
    res.send("Update product by id");
  }

  async getStock(req: Request, res: Response) {
    res.send("Get stock of all products");
  }
}

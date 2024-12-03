import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { ProductTypes } from "../types";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }
  // /product/:id
  async getProduct(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const product = await this.productService.getProduct(id);
      return res.send({ success: true, data: product });
    } catch (error) {
      return res.send({
        success: false,
        message: error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  // /product
  async createProduct(req: Request, res: Response): Promise<any> {
    try {
      const product = req.body as ProductTypes;
      const newProduct = await this.productService.createProduct(product);
      return res.send({
        success: true,
        message: "Product created",
        data: newProduct,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  // /product
  async updateProduct(req: Request, res: Response): Promise<any> {
    try {
      const product = req.body as ProductTypes;
      const updatedProduct = await this.productService.updateProduct(product);
      return res.send({
        success: true,
        message: "Product updated",
        data: updatedProduct,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  // /product/stock/all-products
  async getStock(req: Request, res: Response): Promise<any> {
    try {
      const products = await this.productService.getStock();
      return res.send({ success: true, data: products });
    } catch (error) {
      return res.send({
        success: false,
        message: error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
}
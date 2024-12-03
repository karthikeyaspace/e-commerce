import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { randomUUID } from "crypto";

const userService = new UserService();
export class UserController {
  async getUser(req: Request, res: Response) {
    res.send("Get Users by ID");
  }
  async createUser(req: Request, res: Response) {
    res.send("Create User");
  }

  async updateUser(req: Request, res: Response) {
    res.send("Update User by ID");
  }
}

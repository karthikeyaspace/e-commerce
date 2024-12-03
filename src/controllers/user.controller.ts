import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserTypes } from "../types";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // route - /user/:id
  async getUser(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const user = await this.userService.getUser(id);
      return res.send({ success: true, data: user });
    } catch (error) {
      return res.send({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  // route - /user/
  async createUser(req: Request, res: Response): Promise<any> {
    try {
      const user = req.body as UserTypes;
      const newUser = await this.userService.createUser(user);
      return res.send({
        success: true,
        message: "User created",
        data: newUser,
      });
    } catch (error) {
      return res.send({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  // route - /user
  async updateUser(req: Request, res: Response): Promise<any> {
    try {
      const user = req.body as UserTypes;
      const updatedUser = await this.userService.updateUser(user);

      return res.send({
        success: true,
        message: "User updated",
        data: updatedUser,
      });
    } catch (error) {
      return res.send({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
}

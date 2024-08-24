import Context from "../data/Context.js";
import BaseController from "./BaseController.js";
import { singleton, inject } from "tsyringe";
import { Request, Response } from "express";

/*
 * Controller to manage actions related to Users
 * Has access to dbContext via DI (see ../middlewares/useControllers.ts)
 */

@singleton()
class UserController extends BaseController {
  constructor(@inject("Context") private _db: Context) {
    super();
  }

  testFunc = () => {
    console.log("Testing in UserController");
  };

  getUsers = async (req: Request, res: Response) => {
    const users = await this._db.models.User.findAll({ raw: true });
    res.json(users);
  };

  getUserById = async (req: Request, res: Response) => {
    const user = await this._db.models.User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.json({ error: "User not found" });
    }
  };
}

export default UserController;

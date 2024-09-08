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

  createUser = async (req: Request, res: Response) => {
    const { fname, lname, phone, email, password } = req.body;
    const newUser: any = await this._db.models.User.create({
      fname: fname,
      lname: lname,
      phone: phone,
      email: email,
      password: password,
    });
    console.log(`New user created with ID: ${newUser.userID}`);
    console.log(newUser.toJSON());
    res.json({ success: `New user created with ID: ${newUser.userID}` });
  };

  updateUser = async (req: Request, res: Response) => {
    const { fname, lname, phone, email, password } = req.body;
    const user = await this._db.models.User.findByPk(req.params.id);
    if (user) {
      try {
        user.set({
          fname: fname,
          lname: lname,
          phone: phone,
          email: email,
          password: password,
        });
        await user.save();
        res.status(200).json({ success: "User updated sucessfully" });
      } catch (err) {
        res.status(500).json({ err: "Could not update User" });
      }
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const user = await this._db.models.User.findByPk(req.params.id);
    if (user) {
      try {
        user.destroy();
        res.status(200).json({ success: "User deleted successfully" });
      } catch (err) {
        if (err instanceof Error) res.status(500).json({ error: err.message });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  };
}

export default UserController;

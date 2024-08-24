import express, { Request, Response } from "express";
import { checkUser } from "../models/User.js";
import validate from "../middlewares/useValidation.js";

const router = express.Router();

// get all users
router.get("/", async (req: Request, res: Response) => {
  const userController = req.controllers.userController;
  if (userController) {
    await userController.getUsers(req, res);
  } else {
    console.error("Error accessing UserController");
  }
});

// create new user
router.post("/", checkUser(), validate, async (req: Request, res: Response) => {
  const userController = req.controllers.userController;
  if (userController) {
    await userController.createUser(req, res);
  }
});

// Get user details
router.get("/:id", async (req: Request, res: Response) => {
  const userController = req.controllers.userController;
  if (userController) {
    await userController.getUserById(req, res);
  } else {
    console.error("Error accessing UserController");
  }
});

// Update user
router.put("/:id", checkUser(), validate, async (req: Request, res: Response) => {
  const userController = req.controllers.userController;
  if (userController) {
    await userController.updateUser(req, res);
  }
});

// Delete user
router.delete("/:id", async (req: Request, res: Response) => {
  const userController = req.controllers.userController;
  if (userController) {
    await userController.deleteUser(req, res);
  }
});

export default router;

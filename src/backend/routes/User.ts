import express, { Request, Response } from "express";

const router = express.Router();

// get all users
router.get("/", async (req: Request, res: Response) => {
  const userController = req.controllers.userController;
  if (userController) {
    const users = await userController.getUsers(req, res);
  } else {
    console.error("Error accessing UserController");
  }
});

// create new user
router.post("/", (req: Request, res: Response) => {
  res.send("POST request on /users");
});

// Get user details
router.get("/:id", async (req: Request, res: Response) => {
  const userController = req.controllers.userController;
  if (userController) {
    await userController.getUserById(req, res);
  } else {
    console.error("Error accessing UserController")
  }
});

// Update user
router.put("/:id", (req: Request, res: Response) => {
  res.send(`PUT request on /users/${req.params.id}`);
});

// Delete user
router.delete("/:id", (req: Request, res: Response) => {
  res.send(`DELETE request on /users/${req.params.id}`);
});

export default router;

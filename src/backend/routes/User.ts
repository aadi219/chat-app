import express, { Request, Response } from "express";

const router = express.Router();

// /users
// get all users
router.get("/", (req: Request, res: Response) => {
  res.send("GET request on /users");
});

// create new user
router.post("/", (req: Request, res: Response) => {
  res.send("POST request on /users");
});
/*******************************************************/

// /users/id
// Get user details
router.get("/:id", (req: Request, res: Response) => {
  res.send(`GET request on /users/${req.params.id}`);
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

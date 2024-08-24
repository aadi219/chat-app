import express, { Request, Response } from "express";

const router = express.Router();

// /chats
// get all chats
router.get("/", (req: Request, res:Response) => {
  res.send("GET request on /chats");
})

// get all chats for user
router.get("/user/:userId", (req: Request, res: Response) => {
  res.send(`GET request on /chats/user/${req.params.userId}`);
});

// create new chat
router.post("/", (req: Request, res: Response) => {
  res.send("POST request on /chats");
});
/*******************************************************/

// /chat/id
// Get chat details
router.get("/:id", (req: Request, res: Response) => {
  res.send(`GET request on /chats/${req.params.id}`);
});

// Update chat 
router.put("/:id", (req: Request, res: Response) => {
  res.send(`PUT request on /chats/${req.params.id}`);
});

// Delete chat 
router.delete("/:id", (req: Request, res: Response) => {
  res.send(`DELETE request on /chats/${req.params.id}`);
});

export default router;

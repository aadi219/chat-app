import express, { Request, Response } from "express";

const router = express.Router();

// /chats
// get all chats
router.get("/", async (req: Request, res:Response) => {
  const chatController = req.controllers.chatController;
  if (chatController) {
    await chatController.getChats(req, res);
  }
})

// get all chats for user
router.get("/user/:userId", async (req: Request, res: Response) => {
  const chatController = req.controllers.chatController;
  if (chatController) {
    await chatController.getChatsForUser(req, res);
  }
});

// create new chat
router.post("/", async (req: Request, res: Response) => {
  const chatController = req.controllers.chatController;
  if (chatController) {
    await chatController.createChat(req, res);
  }
});
/*******************************************************/

// /chat/id
// Get chat details
router.get("/:id", async (req: Request, res: Response) => {
  const chatController = req.controllers.chatController;
  if (chatController) {
    await chatController.getChatById(req, res);
  }
});

// Update chat 
router.put("/:id", async (req: Request, res: Response) => {
  const chatController = req.controllers.chatController;
  if (chatController) {
    await chatController.updateChat(req, res);
  }
});

// Delete chat 
router.delete("/:id", async (req: Request, res: Response) => {
  const chatController = req.controllers.chatController;
  if (chatController) {
    await chatController.deleteChat(req, res);
  }
});

export default router;

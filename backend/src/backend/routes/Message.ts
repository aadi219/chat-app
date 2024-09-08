import express, { Request, Response } from "express";

// route for messages is /chats/:chatId/messages/
const router = express.Router({ mergeParams: true });

router.get("/", async (req: Request, res: Response) => {
  const msgController = req.controllers.messageController;
  if (msgController) {
    await msgController.getMessagesForChat(req, res);
  }
});

router.post("/", async (req: Request, res: Response) => {
  const msgController = req.controllers.messageController;
  if (msgController) {
    await msgController.createMessage(req, res);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const msgController = req.controllers.messageController;
  if (msgController) {
    await msgController.updateMessage(req, res);
  }
});

router.delete("/", async (req: Request, res: Response) => {});

export default router;

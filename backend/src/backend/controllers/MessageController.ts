import Context from "../data/Context.js";
import BaseController from "./BaseController.js";
import { singleton, inject } from "tsyringe";
import { Request, Response } from "express";

/*
 * Controller to manage actions related to Messages
 * Has access to dbContext via DI (see ../middlewares/useControllers.ts)
 */

@singleton()
class MessageController extends BaseController {
  constructor(@inject("Context") private _db: Context) {
    super();
  }

  getMessagesForChat = async (req: Request, res: Response) => {
    const chatId = req.params.chatId;
    try {
      const chatWithMessages = await this._db.models.Chat.findByPk(chatId, {
        attributes: ["chatID"],
        include: {
          model: this._db.models.Message,
        },
      });
      if (!chatWithMessages) {
        return res.status(400).json({ error: "Chat not found" });
      } else {
        return res.status(200).json(chatWithMessages);
      }
    } catch (err) {
      console.error("[ERROR] While fetching messages for chats: ", err);
      return res
        .status(500)
        .json({ error: "An unexpected error occurred when fetching messages" });
    }
  };

  createMessage = async (req: Request, res: Response) => {
    const chatId = req.params.chatId; // chat to which the message is sent -> passed as part of the request parameters
    const senderId = req.body.senderId; // user who sent the message -> passed in the request body
    try {
      const chat = await this._db.models.Chat.findByPk(chatId, {
        attributes: ["chatID"],
        include: {
          model: this._db.models.User,
          attributes: ["userID"],
          where: {
            userID: senderId,
          },
          through: {
            attributes: [],
          },
          required: true,
        },
      });
      if (!chat) {
        return res.status(400).json({ error: "Chat not found" });
      } else {
        const { content, repliedTo } = req.body;
        const user = chat.Users[0];
        const newMsg = await this._db.models.Message.create({
          repliedTo: repliedTo,
          content: content,
        });
        newMsg.setChat(chat);
        newMsg.setUser(user);
        return res.status(200).json({
          success: `New message created successfully with ID: ${newMsg.messageID}`,
        });
      }
    } catch (err) {
      console.error("[ERROR] While creating message: ", err);
      res.status(500).json({
        error: "An unexpected error occurred when trying ot create message",
      });
    }
  };

  updateMessage = async (req: Request, res: Response) => {
    try {
      const msg = await this._db.models.Message.findByPk(req.params.id);
      if (!msg) {
        return res.status(400).json({ error: "Message not found" });
      }
      const { content } = req.body;
      msg.set({
        content: content,
      });
      await msg.save();
      return res.status(200).json({ success: "Message updated" });
    } catch (err) {
      console.error("[ERROR] While updating message: ", err);
      return res
        .status(500)
        .json({ error: "An unexpected error occurred when updating message" });
    }
  };

  deleteMessage = async (req: Request, res: Response) => {
    try {
      const msg = await this._db.models.Message.findByPk(req.params.id);
      if (!msg) {
        return res.status(400).json({error: "Message not found"});
      }
      await msg.destroy();
      return res.status(200).json({success: "Message deleted"});
    } catch (err) {
      console.error("[ERROR] While deleting message: ", err);
      return res
        .status(500)
        .json({ error: "An unexpected error occurred when deleting message" });
    }
  }
}

export default MessageController;

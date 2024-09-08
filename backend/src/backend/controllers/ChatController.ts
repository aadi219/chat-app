import Context from "../data/Context.js";
import BaseController from "./BaseController.js";
import { singleton, inject } from "tsyringe";
import { Request, Response } from "express";

/*
 * Controller to manage actions related to Chats
 * Has access to dbContext via DI (see ../middlewares/useControllers.ts)
 */

@singleton()
class ChatController extends BaseController {
  constructor(@inject("Context") private _db: Context) {
    super();
  }

  getChats = async (req: Request, res: Response) => {
    try {
      const chats = await this._db.models.Chat.findAll();
      res.status(200).json(chats);
    } catch (err) {
      res
        .status(500)
        .json({ err: "An error occurred when trying to fetch chats" });
      console.error("[ERROR] Error when fetching chats: ", err);
    }
  };

  getChatById = async (req: Request, res: Response) => {
    try {
      const chat = await this._db.models.Chat.findByPk(req.params.id);
      if (!chat) {
        res.status(400).json({ error: "Chat not found" });
      } else {
        res.status(200).json(chat);
      }
    } catch (err) {
      res.status(500).json({
        error: "An unexpected error occurred when trying to fetch chat",
      });
      console.error("[ERROR] Error when fetching chat: ", err);
    }
  };

  getChatsForUser = async (req: Request, res: Response) => {
    try {
      const user = await this._db.models.User.findByPk(req.params.userId);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      } else {
        const chats = await this._db.models.Chat.findAll({
          include: {
            model: this._db.models.User, // join with User
            attributes: ["userID"], // only select userID from User table
            where: {
              userID: user.userID, // filter result by userID
            },
            through: {
              attributes: [], // do not select any columns of join table chat_users
            },
          },
          raw: true,
        });
        return res.status(200).json(chats);
      }
    } catch (err) {
      res.status(500).json({
        error: "An unexpected error occurred when trying get chats for user",
      });
      console.error("[ERROR] Error when fetching chats for user: ", err);
    }
  };

  createChat = async (req: Request, res: Response) => {
    const { userId1, userId2 } = req.body;
    try {
      const users = await this._db.models.User.findAll({
        where: {
          userID: [userId1, userId2],
        },
      });
      if (users.length < 2) {
        res.status(400).json({ error: "User not found" });
      } else {
        const title = `${users[0].fname} and ${users[1].fname}`;
        const description = "Add a chat description!";
        const newChat: any = await this._db.models.Chat.create({
          title: title,
          description: description,
        });
        await newChat.setUsers([users[0], users[1]]);
        res
          .status(200)
          .json({ sucess: `New chat created with ID: ${newChat.chatID}` });
      }
    } catch (err) {
      res.status(500).json({
        error: "An unexpected error occurred when trying to create chat",
      });
      console.error("[ERROR] Error occurred when trying to create chat: ", err);
    }
  };

  deleteChat = async (req: Request, res: Response) => {
    // TODO: instead of deleting chat record, add isDeleted attribute to table and archive chat on deletion.
    try {
      const chat = await this._db.models.Chat.findByPk(req.params.id);
      if (!chat) {
        res.status(400).json({ error: "Chat not found" });
      } else {
        await chat.destroy();
        res.status(200).json({ success: "Chat deleted" });
      }
    } catch (err) {
      res.status(500).json({
        error: "An unexpected error occurred when trying to delete chat",
      });
      console.error("[ERROR] Error occurred when trying to delete chat: ", err);
    }
  };

  updateChat = async (req: Request, res: Response) => {
    try {
      const chat = await this._db.models.Chat.findByPk(req.params.id);
      if (!chat) {
        res.status(400).json({ error: "Chat not found" });
      } else {
        const { title, description, chatIcon, inviteLink } = req.body;
        chat.set({
          title: title || chat.title,
          description: description || chat.description,
          chatIcon: chatIcon || chat.chatIcon,
          inviteLink: inviteLink || chat.inviteLink,
        });
        await chat.save();
        res.status(200).json({ success: "Chat updated successfully" });
      }
    } catch (err) {
      res
        .status(500)
        .json({
          error: "An unexpected error occurred when trying to update chat",
        });
      console.error("[ERROR] Error occurred when trying to update chat: ", err);
    }
  };
}
export default ChatController;

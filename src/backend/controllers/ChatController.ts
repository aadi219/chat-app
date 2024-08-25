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
}
export default ChatController;

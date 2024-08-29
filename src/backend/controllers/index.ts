import BaseController from "./BaseController.js";
import UserController from "./UserController.js";
import ChatController from "./ChatController.js";
import MessageController from "./MessageController.js";

export default {
  BaseController,
  UserController,
  ChatController,
  MessageController,
};

// extend the request interface to attach controllers.
declare global {
  namespace Express {
    interface Request {
      controllers: {
        userController: UserController;
        chatController: ChatController;
        messageController: MessageController;
      };
    }
  }
}

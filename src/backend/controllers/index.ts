import BaseController from "./BaseController.js";
import UserController from "./UserController.js";

export default {
  BaseController,
  UserController
}

// extend the request interface to attach controllers.
declare global {
  namespace Express {
    interface Request {
      controllers: {
        userController: UserController
      }
    }
  }
}

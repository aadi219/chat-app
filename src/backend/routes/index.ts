import express from "express";
import userRoutes from "./User.js";
import chatRoutes from "./Chat.js";

const useRoutes = (app: express.Application) => {
  app.use("/users", userRoutes);
  app.use("/chats", chatRoutes);
}

export default useRoutes;

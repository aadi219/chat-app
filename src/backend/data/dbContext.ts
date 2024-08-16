// TODO: Implement migrations

import { Sequelize } from "sequelize";
import Models from "../models/index.js";
import Context from "./Context.js";

async function connectToDB(config: {
  dbName: string;
  username: string;
  password: string;
  host: string;
  port: string;
}) {
  const { dbName, username, password, host, port } = { ...config };
  const sequelize = new Sequelize(dbName, username, password, {
    host: host,
    port: parseInt(port),
    dialect: "postgres",
  });
  const db = new Context(sequelize);
  const models = defineAssociations(db.context);
  db.loadModels(models);

  try {
    // test db connection
    await db.context.authenticate();
    console.log("Connection to database established");

    // load models and sync changes. NOTE: this does not create migrations

    // return db instance
    return db;
  } catch (err) {
    console.error("Could not connect to database:", err);
  }
}

function defineAssociations(context: Sequelize) {
  const { UserModel, ChatModel, MessageModel } = { ...Models };
  // define models;
  const User = UserModel(context);
  const Chat = ChatModel(context);
  const Message = MessageModel(context);

  // define relationships
  // foreignKey option used to explicitly define column name. Must be included in both sides of the relationship.
  Chat.hasMany(Message, { foreignKey: "chatID" });
  Message.belongsTo(Chat, { foreignKey: "chatID" });

  User.hasMany(Message, { foreignKey: "userID" });
  Message.belongsTo(User, { foreignKey: "chatID" });

  User.belongsToMany(Chat, {
    through: "chat_user",
    foreignKey: "userID",
    otherKey: "chatID",
  });
  Chat.belongsToMany(User, {
    through: "chat_user",
    foreignKey: "chatID",
    otherKey: "userID",
  });
  return { User, Chat, Message};
}

export default connectToDB;

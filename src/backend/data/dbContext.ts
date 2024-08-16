// TODO: Implement migrations

import { Sequelize } from "sequelize";
import Models from "../models/index.js";

async function connectToDB(config: {
  dbName: string;
  username: string;
  password: string;
  host: string;
  port: string;
}) {
  const { dbName, username, password, host, port } = { ...config };
  const db = new Sequelize(dbName, username, password, {
    host: host,
    port: parseInt(port),
    dialect: "postgres",
  });
  try {
    // test db connection
    await db.authenticate();
    console.log("Connection to database established");

    // load models and sync changes. NOTE: this does not create migrations
    loadModels(db);
    console.log("Models synced successfully");

    // return db instance
    return db;
  } catch (err) {
    console.error("Could not connect to database:", err);
  }
}

function loadModels(context: Sequelize) {
  const { User, Chat, Message } = { ...Models };
  // define models;
  const user = User(context);
  const chat = Chat(context);
  const msg = Message(context);

  // define relationships
  // foreignKey option used to explicitly define column name. Must be included in both sides of the relationship.
  chat.hasMany(msg, { foreignKey: "chatID" });
  msg.belongsTo(chat, { foreignKey: "chatID" });

  user.hasMany(msg, { foreignKey: "userID" });
  msg.belongsTo(user, { foreignKey: "chatID" });

  user.belongsToMany(chat, { through: "chat_user", foreignKey: "userID", otherKey: "chatID" });
  chat.belongsToMany(user, { through: "chat_user", foreignKey: "chatID", otherKey: "userID" });
}

export default connectToDB;

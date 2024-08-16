import { DataTypes } from "sequelize";

export default (sequelize: any) => {
  const Chat = sequelize.define(
    "Chat",
    {
      chatID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      inviteLink: {
        type: DataTypes.STRING,
      },
      chatIcon: {
        type: DataTypes.BLOB,
      },
    },
    {
      schema: "app",
    },
  );
  return Chat;
};

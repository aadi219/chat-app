import { DataTypes } from "sequelize";

export default (sequelize: any) => {
  const Message = sequelize.define(
    "Message",
    {
      messageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      repliedTo: {
        type: DataTypes.INTEGER,
      },
    },
    {
      schema: "app",
    },
  );
  return Message;
};

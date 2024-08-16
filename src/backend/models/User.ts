import { DataTypes } from "sequelize";

export default (sequelize: any) => {
  const User = sequelize.define(
    "User",
    {
      userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING(10),
      },
      email: {
        type: DataTypes.STRING,
      },
      fname: {
        type: DataTypes.STRING(15),
      },
      lname: {
        type: DataTypes.STRING(15),
      },
    },
    {
      schema: "app",
    },
  );
  return User;
};

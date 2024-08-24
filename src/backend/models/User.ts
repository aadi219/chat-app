import { DataTypes } from "sequelize";
import { checkSchema } from "express-validator";

export const UserModel = (sequelize: any) => {
  const User = sequelize.define(
    "User",
    {
      userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

export const checkUser = () => checkSchema({
    email: {
      isEmail: {
        errorMessage: "Please provide a valid email address.",
      },
    },
    phone: {
      isMobilePhone: {
        options: ["any"],
      },
    },
    fname: { notEmpty: true },
    lname: { notEmpty: true },
  });

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
        allowNull: false,
      },
      fname: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      lname: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      schema: "app",
    },
  );
  return User;
};

export const checkUser = () =>
  checkSchema({
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
    password: {
      notEmpty: true,
      isLength: {
        options: { min: 8, max: 25 },
        errorMessage: "Password must be between 8 and 25 characters",
      },
      custom: {
        options: (value: string) => {
          return (
              /[a-z]/.test(value) && // at least 1 lower case letter
              /[A-Z]/.test(value) && // at least 1 upper case letter
              /\d/.test(value) && // at least 1 number
              /[\W_]/.test(value) //  at least 1 special character 
          )
        },
        errorMessage: "Password does not match validation requirements" 
      },
    },
  });

import { Sequelize, Model } from "sequelize";
import "reflect-metadata"; // required for dependency injection to register the service

class Context {
  context: Sequelize;
  models: any;

  constructor(context: Sequelize) {
    this.context = context;
  }

  loadModels = (models: any) => {
    this.models = models;
  }
}

export default Context;

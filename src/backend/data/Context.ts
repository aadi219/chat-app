import { Sequelize, Model } from "sequelize";

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

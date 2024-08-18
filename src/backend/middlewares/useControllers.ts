import controllers from "../controllers/index.js";
import express from "express";
import Context from "../data/Context.js";
import "reflect-metadata";
import { container } from "tsyringe";

/*
 * Middleware to allow creation of constructors using dependency injection.
 * - controller classes are imported
 * - Dependency container is created with an instance of dbContext (passed from index.ts)
 * - controller instance is created by resolving necessary dependency
 * - controller instances with injected dependencies are returned back to caller
 */

function useControllers(dbContext: Context) {
  const { UserController } = controllers;
  container.register("Context", { useValue: dbContext });
  const userController = container.resolve(UserController);
  return {
    userController,
  };
}

export default useControllers;

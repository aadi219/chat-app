import express, { Express, Request, Response } from "express";
import "dotenv/config";
import connectToDB from "./data/dbContext.js";
import dbConfig from "./data/config.js";

const main = async () => {
  const app: Express = express();
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Backend running on PORT:${PORT}`);
  });

  const db = await connectToDB(dbConfig);

  // middleware
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    console.log('Accessed route "/"');
    res.send("Response from /");
  });
  app.get("/users", async (req: Request, res: Response) => {
    if (db) {
      const users = db.models.user.findAll();
      console.log(users);
    }
  });
  app.post("/users", async (req: Request, res: Response) => {
    if (db) {
      const user = await db.models.User.create(req.body);
      console.log(`User ${req.body.fname} added with ID: ${user.userID}`);
      res.send(`User ${req.body.fname} added with ID: ${user.userID}`);
    }
  });
};

main();

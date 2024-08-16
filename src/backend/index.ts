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

  app.get("/", (req: Request, res: Response) => {
    console.log('Accessed route "/"');
    res.send("Response from /");
  });
};

main();

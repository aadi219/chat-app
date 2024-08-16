import express, { Express, Request, Response } from "express";
import "dotenv/config";
import connectToDB from "./data/dbContext.js";

const main = async () => {
  const app: Express = express();
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Backend running on PORT:${PORT}`);
  });

  const dbConfig= {
    dbName: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
  };
  const db = await connectToDB(dbConfig);

  app.get("/", (req: Request, res: Response) => {
    console.log('Accessed route "/"');
    res.send("Response from /");
  });
};

main();

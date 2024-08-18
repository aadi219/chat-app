import express, { Express, Request, Response } from "express";
import "dotenv/config";
import connectToDB from "./data/dbContext.js";
import dbConfig from "./data/config.js";
import useRoutes from "./routes/index.js";
import useControllers from "./middlewares/useControllers.js";
import Context from "./data/Context.js";

const main = async () => {
  const app: Express = express();
  const PORT = 3000;

  const db = await connectToDB(dbConfig);

  // middleware
  app.use(express.json());
  useRoutes(app); // register routes
  const { userController } = useControllers(db as Context); // instantiate controllers through DI

  app.listen(PORT, () => {
    console.log(`Backend running on PORT:${PORT}`);
  });

  app.get("/", (req: Request, res: Response) => {
    console.log('Accessed route "/"');
    res.send("Response from /");
  });
};

main();

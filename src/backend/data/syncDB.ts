import dbConfig from "./config.js";
import connectToDB from "./dbContext.js";

(async () => {
  const db = await connectToDB(dbConfig);
  if (db) {
    db.sync({force: true});
  }
})();

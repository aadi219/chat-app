import dbConfig from "./config.js";
import connectToDB from "./dbContext.js";

(async () => {
  const db = await connectToDB(dbConfig);
  if (db) {
    try {
      db.context.sync({ force: true });
      console.log("[SUCCESS] Database synced successfully");
    } catch (err) {
      console.error("[ERROR] Could not sync database: ", err)
    }
  }
})();

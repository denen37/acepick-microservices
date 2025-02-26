import { Sequelize } from "sequelize";
import config from "../config/db";

const env = process.env.NODE_ENV || "development";
const dbConfig = (config as any)[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  }
);


const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

async function connectWithRetry(attempt = 1) {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL database!");
  } catch (error: any) {
    console.error(`❌ Database connection failed (Attempt ${attempt}/${MAX_RETRIES}):`, error.message);
    if (attempt < MAX_RETRIES) {
      console.log(`🔄 Retrying in ${RETRY_DELAY / 1000} seconds...`);
      setTimeout(() => connectWithRetry(attempt + 1), RETRY_DELAY);
    } else {
      console.error("🚨 Max retries reached. Exiting...");
      process.exit(1);
    }
  }
}

connectWithRetry();

export default sequelize;

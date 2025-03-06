import { Sequelize } from "sequelize-typescript";
import config from "./configSetup";
import path from "path";
import { Certification } from "../models/Certification";
import { Cooperation } from "../models/Cooperation";
import { Education } from "../models/Education";
import { Experience } from "../models/Experience";
import { LanLog } from "../models/LanLog";
import { Portfolio } from "../models/Portfolio";
import { Professional } from "../models/Professional";
import { Profile } from "../models/Profile";
import { User } from "../models/User";
import { Verify } from "../models/Verify";
import { VoiceRecording } from "../models/VoiceRecording";
import { Wallet } from "../models/Wallet";


const sequelize = new Sequelize(
    config.DB_NAME || 'test',
    config.DB_USER || 'user',
    config.DB_PASSWORD,
    {
        port: config.DB_PORT,
        host: config.DB_HOST,
        dialect: 'mysql',
        dialectOptions: {
            ssl: false,
        },
        logging: false,
        // models: [path.resolve(__dirname, "../models")],
        models: [Certification, Cooperation, Education, Experience, LanLog, Portfolio, Professional, Profile, User, Verify, VoiceRecording, Wallet]
    }
);

sequelize.models


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

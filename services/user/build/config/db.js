"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const configSetup_1 = __importDefault(require("./configSetup"));
const path_1 = __importDefault(require("path"));
const sequelize = new sequelize_typescript_1.Sequelize(configSetup_1.default.DB_NAME || 'test', configSetup_1.default.DB_USER || 'user', configSetup_1.default.DB_PASSWORD, {
    port: configSetup_1.default.DB_PORT,
    host: configSetup_1.default.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        ssl: false,
    },
    logging: false,
    models: [path_1.default.resolve(__dirname, "../models")],
});
sequelize.models;
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;
function connectWithRetry() {
    return __awaiter(this, arguments, void 0, function* (attempt = 1) {
        try {
            yield sequelize.authenticate();
            console.log("✅ Connected to MySQL database!");
        }
        catch (error) {
            console.error(`❌ Database connection failed (Attempt ${attempt}/${MAX_RETRIES}):`, error.message);
            if (attempt < MAX_RETRIES) {
                console.log(`🔄 Retrying in ${RETRY_DELAY / 1000} seconds...`);
                setTimeout(() => connectWithRetry(attempt + 1), RETRY_DELAY);
            }
            else {
                console.error("🚨 Max retries reached. Exiting...");
                process.exit(1);
            }
        }
    });
}
connectWithRetry();
exports.default = sequelize;
//# sourceMappingURL=db.js.map
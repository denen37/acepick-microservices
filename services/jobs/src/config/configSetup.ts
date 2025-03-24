import path from "path";
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

type Config = {
    HOST: string | undefined;
    PORT: number | undefined;
    AUTH_BASE_URL: string | undefined;
    NODE_ENV: string | undefined;
    DB_NAME: string | undefined;
    DB_USER: string | undefined;
    DB_PASSWORD: string | undefined;
    DB_HOST: string | undefined;
    DB_PORT: number | undefined;
    DB_DIALECT: string | undefined;
    PUBLIC_ROUTES: string[] | [];
    REDIS_INSTANCE_URL: string | undefined;
    PAYSTACK_SECRET: string | undefined;
    RABBITMQ_URL: string | undefined;

};

const getConfig = (): Config => {
    return {
        HOST: process.env.HOST,
        AUTH_BASE_URL: process.env.AUTH_BASE_URL,
        PORT: Number(process.env.PORT),
        NODE_ENV: process.env.NODE_ENV,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: Number(process.env.DB_PORT),
        DB_DIALECT: process.env.DB_DIALECT,
        REDIS_INSTANCE_URL: process.env.REDIS_INSTANCE_URL,
        PAYSTACK_SECRET: process.env.PAYSTACK_SECRET,
        RABBITMQ_URL: process.env.RABBITMQ_URL,
        PUBLIC_ROUTES: [
            "/api/jobs/search_profs",
            "/api/jobs/get_profs"
        ],
    };
};


const getSanitzedConfig = (config: Config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config as Config;
};


const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;

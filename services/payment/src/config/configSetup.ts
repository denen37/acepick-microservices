import path from "path";
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

type Config = {
    PORT: number | undefined;
    AUTH_BASE_URL: string | undefined;
    JOBS_BASE_URL: string | undefined;
    HOST: string | undefined;
    NODE_ENV: string | undefined;
    DB_NAME: string | undefined;
    DB_USER: string | undefined;
    DB_PASSWORD: string | undefined;
    DB_HOST: string | undefined;
    DB_PORT: number | undefined;
    DB_DIALECT: string | undefined;
    EMAIL_SERVICE: string | undefined;
    EMAIL_PORT: number | undefined;
    EMAIL_USER: string | undefined;
    EMAIL_PASS: string | undefined;
    EMAIL_HOST: string | undefined;
    PUBLIC_ROUTES: string[] | [];
    TOKEN_SECRET: string;
    PAYSTACK_SECRET_KEY: string | undefined;
};

const getConfig = (): Config => {
    return {
        PORT: Number(process.env.PORT),
        HOST: process.env.HOST,
        AUTH_BASE_URL: process.env.AUTH_BASE_URL,
        JOBS_BASE_URL: process.env.JOBS_BASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: Number(process.env.DB_PORT),
        DB_DIALECT: process.env.DB_DIALECT,
        EMAIL_SERVICE: process.env.EMAIL_SERVICE,
        EMAIL_PORT: Number(process.env.EMAIL_PORT),
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS,
        EMAIL_HOST: process.env.EMAIL_HOST,
        TOKEN_SECRET: process.env.TOKEN_SECRET || 'supersecret',
        PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
        PUBLIC_ROUTES: [
            '/api',
            '/',
            '/api/auth/send-otp',
            '/api/auth/register',
            '/api/auth/verify-otp',
            '/api/auth/verify-token',
            '/api/webhook',
            '/api/auth/change-password-forgot',
            '/api/delete-users',
            '/api/auth/send-otp',
            '/api/auth/login',
            '/api/testN',
            '/api/sector',
            '/api/fileupload',
            '/api/profession',
            '/api/admin/send-invites',
            '/api/admin/get-invite',
            '/api/admin/reset-password',

            '/api/admin/update-invite',
            '/api/admin/check-email',
            "/api/admin/register",
            "/api/admin/login",
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

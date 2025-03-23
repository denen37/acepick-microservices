"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const getConfig = () => {
    return {
        PORT: Number(process.env.PORT),
        JOBS_PORT: Number(process.env.JOBS_PORT),
        HOST: process.env.HOST,
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
        REDIS_INSTANCE_URL: process.env.REDIS_INSTANCE_URL,
        PAYSTACK_SECRET: process.env.PAYSTACK_SECRET,
        RABBITMQ_URL: process.env.RABBITMQ_URL,
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
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
const getSanitzedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config;
};
const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
exports.default = sanitizedConfig;
//# sourceMappingURL=configSetup.js.map
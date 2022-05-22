import dotenv from "dotenv";
import fs from "fs";

// checking if .env file is available
if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" });
} else {
    console.error(".env file not found.");
}

export class DotEnvConfig {
    static readonly PORT: number = Number(process.env.SERVER_PORT) as number;
    static readonly JWT_SECRET: string = process.env.JWT_SECRET as string;
    static readonly JWT_EXPIRATION: string = process.env.JWT_EXPIRATION as string;
    static readonly MYSQL_DATABASE: string = process.env.MYSQL_DATABASE as string;
    static readonly MYSQL_HOST: string = process.env.MYSQL_HOST as string;
    static readonly MYSQL_PORT: string = process.env.MYSQL_PORT as string;
    static readonly MYSQL_USER: string = process.env.MYSQL_USER as string;
    static readonly MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD as string;
    static readonly MYSQL_ROOT_PASSWORD: string = process.env.MYSQL_ROOT_PASSWORD as string;
    static readonly CLIENT_ID: string = process.env.CLIENT_ID as string;
    static readonly CLIENT_SECRET: string = process.env.CLIENT_SECRET as string;
    static readonly CALLBACK_URI: string = process.env.CALLBACK_URI as string;
}
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
export const database = new Sequelize({
    database: process.env.MYSQL_DATABASE,
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
});
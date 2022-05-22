import { Sequelize } from "sequelize";
import { DotEnvConfig } from "./dot-env.config";

export const database = new Sequelize({
    database: DotEnvConfig.MYSQL_DATABASE,
    dialect: 'mysql',
    host: DotEnvConfig.MYSQL_HOST,
    port: Number(DotEnvConfig.MYSQL_PORT),
    username: DotEnvConfig.MYSQL_USER,
    password: DotEnvConfig.MYSQL_PASSWORD,
});
import { DataTypes, Model } from "sequelize";
import { database } from "../config/database.config";

export class User extends Model {
    public id?: number;
    public name?: string;
    public email?: string;
    public createdAt?: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    },
    {
        tableName: "users",
        sequelize: database,
    }
);

User.sync().then(() => { console.log('users table created') });
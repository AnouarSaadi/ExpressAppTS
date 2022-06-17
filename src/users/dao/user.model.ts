import { DataTypes, Model } from "sequelize";
import { database } from "../../config/database.config";
// import { database } from "../config/database.config";

export class User extends Model {
    public id?: number;
    public email?: string;
    public verified?: boolean;
    public name?: string;
    public familyName?: string;
    public givenName?: string;
    public photo?: string;
    public createdAt?: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(200),
            unique: true,
            allowNull: false,
        },
        verified: {
            type: DataTypes.BOOLEAN(),
            defaultValue: false,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        familyName: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        givenName: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING(200),
            allowNull: false,
        }

    },
    {
        tableName: "users",
        sequelize: database,
    }
);

User.sync().then(() => { console.log('users table created') });
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { UserController } from "./user.controller";
import { User } from "../model/user.model";
import { google } from "googleapis";
import googleApiConfig from "../config/google-api.config";

dotenv.config();

export class AuthController {

    private static authController: AuthController;
    private authCheck: boolean;

    constructor() {
        this.authCheck = false;
    }

    public static getInstance(): AuthController {
        if(!AuthController.authController) {
            AuthController.authController = new AuthController();
        }
        return AuthController.authController;
    }

    public auth = async (req: Request, res: Response) => {
        let oauth2 = google.oauth2({version: 'v2', auth: googleApiConfig.getClientOAuth2()});
        if (this.authCheck) {
            let userInfo = await oauth2.userinfo.v2.me.get();
            res.render('index', {buttonSpan: 'Sign out', url: 'http://localhost:3001/logout', userInfo: userInfo.data})
        } else {
            res.render('index', {buttonSpan: 'Sign in', url: googleApiConfig.getRedirectUrl(), userInfo: {}})
        }
    }

    public redirect = async (req: Request, res: Response) => {
        res.send('OK redirect');
    }

    public login = async (req: Request, res: Response) => {
        const { name, email } = req.body;
        let user: User | null = await User.findOne<User>({
            where: {
                email,
            }
        });
        if (!user) {
            user = await User.create<User>({
                name,
                email,
            });
        }
        const token = await this.createToken(user);
        res.setHeader('Set-Cookie', [this.createCookie(token)]);
        res.send(user);
    }

    private createToken = async (user: User) => {
        const expiresIn = process.env.JWT_EXPIRATION;
        const jwtSecret = process.env.JWT_SECRET;
        const { id, email } = user;
        return jwt.sign({ id, email }, `${jwtSecret}`, {
            expiresIn,
        });
    }

    private createCookie(token: string) {
        return `Authorization=${token}; HttpOnly; Max-Age=${process.env.JWT_EXPIRATION}`;
    }
}

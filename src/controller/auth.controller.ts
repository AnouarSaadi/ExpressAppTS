import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../model/user.model";
import { DotEnvConfig } from "../config/dot-env.config";
import { ReqUser } from "../interface/req-user.interface";
import { CreateUserDto } from "../dto/create-user.dto";

export class AuthController {

    private static authController: AuthController;

    constructor() {
    }

    public static getInstance(): AuthController {
        if (!AuthController.authController) {
            AuthController.authController = new AuthController();
        }
        return AuthController.authController;
    }

    /**
     * @method handleAfterAuth
     * @param req { Request }
     * @param res { Response }
     */

    public handleAfterAuth = async (req: Request, res: Response) => {
        console.log("Code --> ", req.user);
        const userData: CreateUserDto | undefined = req.user;
        if (userData) {
            console.log("user: ", userData);
            await User.findOne({
                where: { email: userData.email }
            }).then((user: User | null) => { })
                .catch((err) => {

                })
        }
        // const user = await User.findOne();
        res.status(401).send("KO");

        // res.send("ok from redirect");
    }

    public logout = async (req: Request, res: Response) => {
        res.redirect('/auth');
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
        const expiresIn = DotEnvConfig.JWT_EXPIRATION;
        const jwtSecret = DotEnvConfig.JWT_SECRET;
        const { id, email } = user;
        return jwt.sign({ id, email }, `${jwtSecret}`, {
            expiresIn,
        });
    }

    private createCookie(token: string) {
        return `Authorization=${token}; HttpOnly; Max-Age=${DotEnvConfig.JWT_EXPIRATION}`;
    }
}

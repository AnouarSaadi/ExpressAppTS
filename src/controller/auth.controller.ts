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

    public handleAfterAuth = async (
        req: Request,
        res: Response
    ) => {
        try {
            const userData: CreateUserDto | undefined = req.user;
            if (userData) {
                let user = await User.findOne({
                    where: { email: userData.email }
                });
                if (!user) {
                    user = await User.create<User>({
                        email: userData.email,
                        verified: userData.verified,
                        name: userData.name,
                        familyName: userData.familyName,
                        givenName: userData.givenName,
                        photo: userData.photo,
                    });
                }
                const accessToken: string = await this.createToken(user);
                res.status(200).send({ accessToken });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public logout = async (
        req: Request,
        res: Response
    ) => {
        res.send('From logout method');
    }

    /**
     * @method handleSignUpByForm use for the sign up manuely
     * @param req express.Request
     * @param res express.Response 
     */

    public handleSignUpByForm = async (
        req: Request,
        res: Response
    ) => {
        try {
            const userData: CreateUserDto = req.body;
            let user: User | null = await User.findOne<User>({
                where: {
                    email: userData.email,
                }
            });
            if (!user) {
                user = await User.create<User>({
                    email: userData.email,
                    verified: userData.verified,
                    name: userData.name,
                    familyName: userData.familyName,
                    givenName: userData.givenName,
                    photo: userData.photo,
                });
            }
            const accessToken = await this.createToken(user);
            res.status(201).send({accessToken});
        } catch(err) {
            res.status(500).send(err);
        }
    }

    private createToken = async (user: User) => {
        const expiresIn = DotEnvConfig.JWT_EXPIRATION;
        const jwtSecret = DotEnvConfig.JWT_SECRET;
        const { id, email } = user;
        return jwt.sign({ id, email }, `${jwtSecret}`, {
            expiresIn,
        });
    }
}

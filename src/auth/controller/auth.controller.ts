import { Request, Response } from "express";
import { DotEnvConfig } from "../../config/dot-env.config";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../model/user.model";
import { UsersService } from "../../users/service/users.service";
import { AuthService } from "../service/auth.service";

export class AuthController {

    private static authController: AuthController;
    private usersService: UsersService;
    private authService: AuthService;

    constructor() {
        this.usersService = UsersService.getInstance();
        this.authService = AuthService.getInstance();
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
            if (userData && userData.email) {
                let user = await this.usersService.findByEmail(userData.email);
                if (!user) {
                    user = await this.usersService.addUser(userData);
                }
                const accessToken: string = await this.authService.createToken(user);
                res.status(201).json({accessToken, user});
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
            let user: User | null = await this.usersService.findByEmail(userData.email!);
            if (!user) {
                user = await this.usersService.addUser(userData);
            }
            const accessToken = await this.authService.createToken(user);
            res.status(201).json({accessToken, user});
        } catch(err) {
            res.status(500).send(err);
        }
    }
}

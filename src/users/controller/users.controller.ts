import { Request, Response } from "express";
import { JwtMiddleware } from "../../auth/middleware/jwt.middleware";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../model/user.model";
import { UsersService } from "../service/users.service";

export class UsersController {

    /** 
     * @Description this class is a singleton class, it have a single instance 
     **/

    private static usersController: UsersController;

    constructor() {
    }

    public static getInstance(): UsersController {
        if (!UsersController.usersController) {
            UsersController.usersController = new UsersController();
        }
        return UsersController.usersController;
    }

    /** 
     * @Param req Request
     * @Param res Response
     **/

    public async register(req: Request, res: Response): Promise<any> {
        const userData: CreateUserDto = req.body;
        const user = await UsersService.getInstance().addUser(userData);
        return res.status(200).send(user);
    }

    public async findOne(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        await UsersService.getInstance().findById(Number(userId)).then((user: User | null) => {
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ errors: "User not found" });
            }
        }).catch(err => {
            return res.status(500).json(err);
        });
    }

    public async findAll(req: Request, res: Response): Promise<any> {
        const users = await UsersService.getInstance().findAll();
        return res.status(200).send(users);
    }

    public async deleteOne(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        await UsersService.getInstance().deleteById(Number(userId))
            .then((msg) => {
                res.json({ success: true, message: msg });
            }).catch((err) => {
                res.status(401).json({ error: err });
            });
    }

    public async updateProfile(req: Request, res: Response): Promise<any> {
        const { userId } = req.params;
        const data: UpdateUserDto = req.body;
        await UsersService.getInstance().updateUser(Number(userId), data)
            .then((user) => { return res.status(200).json({ success: true, data: user })})
            .catch((err) => {
                return res.status(404).json({success: false, error: 'User not found'});
            })
    }
}

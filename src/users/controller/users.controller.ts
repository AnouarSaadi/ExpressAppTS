import { Request, Response } from "express";
import { JwtMiddleware } from "../../auth/middleware/jwt.middleware";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../model/user.model";
import { UsersService } from "../service/users.service";

export class UsersController {

    /** 
     * @Description this class is a singleton class, it have a single instance 
     **/

    private static usersController: UsersController;

    private usersService: UsersService;

    constructor() {
        this.usersService = UsersService.getInstance();
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
        const user = await this.usersService.addUser(userData);
        return res.status(200).send(user);
    }

    public async findOne(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        await this.usersService.findById(Number(userId)).then((user: User | null) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ errors: "User not found" });
            }
        }).catch(err => {
            res.status(500).json(err);
        });
    }

    public async findAll(req: Request, res: Response): Promise<any> {
        const users = await this.usersService.findAll();
        return res.status(200).send(users);
    }

    public async deleteOne(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        await this.usersService.deleteById(Number(userId))
            .then((msg) => {
                res.json({ success: true, message: msg });
            }).catch((err) => {
                res.status(401).json({ error: err });
            });
    }
}

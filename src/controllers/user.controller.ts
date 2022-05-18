import { Request, Response } from "express";
import { UserInterface } from "../models/user.interface";
import { User } from "../models/user.model";

export class UserController {

    /** 
     * @Description this class is a singleton class, it have a single instance 
    **/

    private static userController: UserController;

    public static getInstance(): UserController {
        if (!UserController.userController) {
            UserController.userController = new UserController();
        }
        return UserController.userController;
    }

    /** 
     * @Param req Request
     * @Param res Response
     **/
    
    public async register(req: Request, res: Response): Promise<void> {
        const data: User = req.body;
        const user = await User.create<User>({ name: data.name, email: data.email });
        res.send(user);
    }

    public async findOne(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        await User.findOne<User>({
            where:
            {
                id: userId
            }
        }).then((user: User | null) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ errors: "User not found" });
            }
        }).catch(err => {
            res.status(500).json(err);
        });
    }

    public async findAll(req: Request, res: Response): Promise<void> {
        const users = await User.findAll<User>();
        res.send(users);
    }

    public async deleteOne(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        await User.sequelize?.query({
            query: `DELETE FROM users WHERE id = ?`,
            values: [userId]
        }).then(() => {
            res.json({ success: true, message: "user delete" });
        }).catch((err) => {
            res.status(401).json({ error: err });
        });
    }
}

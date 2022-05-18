import { Application, Router } from "express";
import { RoutesConfig } from "../config/routes.config";
import { UserController } from "../controller/user.controller";

export class UsersRoutes extends RoutesConfig {
    private static usersRoutes: UsersRoutes;

    constructor(app: Application) {
        super(app, 'UsersRoutes', UserController.getInstance());
    }

    public static getInstance(app: Application): UsersRoutes {
        if (!UsersRoutes.usersRoutes) {
            UsersRoutes.usersRoutes = new UsersRoutes(app);
        }
        return UsersRoutes.usersRoutes;
    }

    public configureRoutes(userController: any): Application {
        this.app.route('/api/users/')
            .get(userController.findAll);

        this.app.route('/api/users/:userId')
            .get(userController.findOne)
            .delete(userController.deleteOne);

        return this.app;
    }
}
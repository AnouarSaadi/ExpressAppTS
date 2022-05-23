import { Application, Router } from "express";
import { RoutesConfig } from "../../config/routes.config";
import { UsersController } from "../controller/users.controller";

export class UsersRoutes extends RoutesConfig {
    private static usersRoutes: UsersRoutes;

    constructor(app: Application) {
        super(app, 'UsersRoutes', UsersController.getInstance());
    }

    public static getInstance(app: Application): UsersRoutes {
        if (!UsersRoutes.usersRoutes) {
            UsersRoutes.usersRoutes = new UsersRoutes(app);
        }
        return UsersRoutes.usersRoutes;
    }

    public configureRoutes(usersController: any): Application {
        this.app.route('/api/users/')
            .get(usersController.findAll);

        this.app.route('/api/users/:userId')
            .get(usersController.findOne)
            .delete(usersController.deleteOne);

        return this.app;
    }
}
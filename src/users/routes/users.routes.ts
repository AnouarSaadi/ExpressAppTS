import { Application } from "express";
import { JwtMiddleware } from "../../auth/middleware/jwt.middleware";
import { RoutesConfig } from "../../config/routes.config";
import { UsersController } from "../controller/users.controller";

export class UsersRoutes extends RoutesConfig {
    private static usersRoutes: UsersRoutes;
    
    constructor(app: Application) {
        super(app, 'UsersRoutes');
    }
    
    public static getInstance(app: Application): UsersRoutes {
        if (!UsersRoutes.usersRoutes) {
            UsersRoutes.usersRoutes = new UsersRoutes(app);
        }
        return UsersRoutes.usersRoutes;
    }
    
    public configureRoutes(): Application {
        const usersController = UsersController.getInstance();
        const jwtMiddleware = JwtMiddleware.getInstance();

        this.app.route('/api/users/')
            .get(jwtMiddleware.validJWTNeeded, usersController.findAll);

        this.app.route('/api/users/:userId')
            .get(jwtMiddleware.validJWTNeeded, usersController.findOne)
            .delete(jwtMiddleware.validJWTNeeded, usersController.deleteOne);

        return this.app;
    }
}
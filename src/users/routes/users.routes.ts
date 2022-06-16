import { Application } from "express";
import { body } from "express-validator";
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
            .get(
                jwtMiddleware.validJWTNeeded,
                usersController.findAll
            );

        this.app.route('/api/users/:userId')
            .all(jwtMiddleware.validJWTNeeded)
            .get(usersController.findOne)
            .delete(usersController.deleteOne)
            .patch(
                body('lastName').isString(),
                body('email').isEmail(),
                body('giveName').isString().isAlpha(),
                body('name').isAlpha(),
                usersController.updateProfile
            );

        return this.app;
    }
}
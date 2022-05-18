import { Application } from "express";
import { RoutesConfig } from "../config/routes.config";
import { AuthController } from "../controller/auth.controller";

export class AuthRoutes extends RoutesConfig {

    private static authRoutes: AuthRoutes;

    constructor(app: Application) {
        super(app, 'AuthRoutes', AuthController.getInstance());
    }

    public static getInstance(app: Application): AuthRoutes {
        if (!AuthRoutes.authRoutes) {
            AuthRoutes.authRoutes = new AuthRoutes(app);
        }
        return AuthRoutes.authRoutes;
    }

    public configureRoutes(authController: any): Application {

        this.app.route('/auth')
            .get(authController.auth)
            .post(authController.login);

        this.app.route('/auth/redirect')
            .get(authController.redirect);

        return this.app;
    }

}
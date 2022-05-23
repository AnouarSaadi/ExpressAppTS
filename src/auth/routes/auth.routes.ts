import { Application } from "express";
import passport from "passport"; import { RoutesConfig } from "../../config/routes.config";
import { AuthController } from "../controller/auth.controller";

/**
 * @Description The AuthRoutes use for routing at the authentication
 */
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

        /**
         * @Endpoint GET http://$host:$port/auth/google
         * @Description use for authenticate the users with google api
         */
        this.app.route('/auth/google')
            .get(passport.authenticate('google', { scope: ['email', 'profile'] }));

        /**
         * @Description the route use for handle the callback after authentication
         */
        this.app.route('/auth/google/redirect')
            .get(passport.authenticate('google'), authController.handleAfterAuth);

        this.app.route('/auth/logout')
            .get(authController.logout);

        return this.app;
    }

}
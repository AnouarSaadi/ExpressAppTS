import { Application } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export class Routes {
    private userController: UserController = UserController.getInstance();
    private authController: AuthController = AuthController.getInstance();

    constructor(app: Application) {
        this.routes(app);
    }

    public routes(app: Application): void {
        app.route('/api/users')
            .get(this.userController.findAll)
            .post(this.userController.register);

        app.route('/api/users/:userId')
            .get(this.userController.findOne)
            .delete(this.userController.deleteOne);

        app.route('/api/auth')
            .post(this.authController.login);
    }
}
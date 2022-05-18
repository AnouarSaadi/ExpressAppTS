import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { authMiddleware } from './middleware/auth.middleware';
import { UsersRoutes } from './routes/users.routes';
import { RoutesConfig } from './config/routes.config';
import { AuthRoutes } from './routes/auth.routes';

const DEFAULT_PORT: number = 3001;
export class App {
    private static app: App;
    private serverApp: Application;
    private server: any;
    private routes: Array<RoutesConfig> = [];

    constructor() {
        this.serverApp = express();
        this.server = createServer(this.serverApp);
        this.initializeMiddlewares();
        this.routes = this.initializeRoutes();
    }

    public static getInstance(): App {
        if (!App.app) {
            App.app = new App();
        }
        return App.app;
    }

    private initializeMiddlewares() {
        this.serverApp.use(bodyParser.json());
        this.serverApp.use(cookieParser());
      }

    public listen(port?: number): void {
        this.server.listen(port ?? DEFAULT_PORT, () => {
            console.log(`Server is running on ${port}`);
        });
    }

    private initializeRoutes(): Array<RoutesConfig> {
        this.routes.push(UsersRoutes.getInstance(this.serverApp));
        this.routes.push(AuthRoutes.getInstance(this.serverApp));

        return this.routes;
    }
}
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Routes } from './configs/routes.config';
import { createServer } from 'http';

const DEFAULT_PORT: number = 3001;
export class App {
    private static app: App;
    private serverApp: Application;
    private server: any;
    static routes: Routes;

    constructor() {
        this.serverApp = express();
        this.server = createServer(this.serverApp);
        this.initializeMiddlewares();
        this.initRoutes();
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

    public initRoutes(): void {
        App.routes = new Routes(this.serverApp);
    }
}
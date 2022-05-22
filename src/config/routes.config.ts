import { Application } from 'express';

export abstract class RoutesConfig {
    protected app: Application;
    protected name: string;

    /**
     * @param app it's the app created by express
     * @param name the name affected to the routes
     * @param controller the controller used at the route specified by name
     */
    constructor(app: Application, name: string, controller: any) {
        this.app = app;
        this.name = name;
        this.configureRoutes(controller);
    }
    getRouteName() {
        return this.name;
    }
    abstract configureRoutes(controller: any): Application;
}
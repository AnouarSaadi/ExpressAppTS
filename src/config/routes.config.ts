import { Application } from 'express';

export abstract class RoutesConfig {
    protected app: Application;
    protected name: string;

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
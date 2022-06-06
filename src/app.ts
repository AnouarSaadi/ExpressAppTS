import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { UsersRoutes } from './users/routes/users.routes';
import { RoutesConfig } from './config/routes.config';
import { AuthRoutes } from './auth/routes/auth.routes';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { DotEnvConfig } from './config/dot-env.config';

const DEFAULT_PORT: number = 3001;
export class App {
    private static app: App;
    private serverApp: Application;
    private server: any;
    private routes: Array<RoutesConfig> = [];

    constructor() {
        this.serverApp = express();
        this.server = createServer(this.serverApp);
        this.setup();
        this.routes = this.initializeRoutes();
    }

    public static getInstance(): App {
        if (!App.app) {
            App.app = new App();
        }
        return App.app;
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

    private setup() {
        this.serverApp.use(bodyParser.json());
        this.serverApp.use(cookieParser());
        passport.use(new GoogleStrategy.Strategy({
            clientID: DotEnvConfig.CLIENT_ID!,
            clientSecret: DotEnvConfig.CLIENT_SECRET!,
            callbackURL: DotEnvConfig.CALLBACK_URI,
            passReqToCallback: true,
        }, (req:any, accessToken: string, refreshToken: string, profile: any, done: Function): any => {
            const user = {
                email: profile.emails[0].value,
                verified: profile.emails[0].verified,
                name: profile.displayName,
                familyName: profile.name.familyName,
                givenName: profile.name.givenName,
                photo: profile.photos[0].value,
            }
            return done(null, user);
        }));

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((obj: any, done) => {
            done(null, obj);
        });

        this.serverApp.use(passport.initialize());
    }
}
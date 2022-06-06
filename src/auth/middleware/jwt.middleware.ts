import { Response, NextFunction, Request } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';
import { DotEnvConfig } from '../../config/dot-env.config';

export class JwtMiddleware {
    private static jwtInstance: JwtMiddleware;

    constructor() {
    }

    public static getInstance(): JwtMiddleware {
        if (!JwtMiddleware.jwtInstance) {
            JwtMiddleware.jwtInstance = new JwtMiddleware();
        }
        return JwtMiddleware.jwtInstance;
    }

    public validJWTNeeded(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if(req.headers['authorization']) {
            try {
                console.log(req.headers['authorization']);
                const auth = req.headers['authorization'].split(' ');
                if (auth[0] !== 'Bearer') {
                    return res.status(401).send();
                }
                res.locals.jwt = jwt.verify(auth[1], `${DotEnvConfig.JWT_SECRET}`) as Jwt;
                next();
            } catch (err) {
                return res.status(403).send();
            }
        }
        else {
            return res.status(401).send('Unauthorized');
        }
    }

}
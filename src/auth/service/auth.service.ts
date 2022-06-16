import * as jwt from "jsonwebtoken";
import { DotEnvConfig } from "../../config/dot-env.config";
import { User } from "../../users/model/user.model";

export class AuthService {
    
    private static authService: AuthService;

    constructor() {
    }

    public static getInstance(): AuthService {
        if (!AuthService.authService) {
            AuthService.authService = new AuthService();
        }
        return AuthService.authService;
    }

    async createToken(user: User): Promise<string> {
            const expiresIn = DotEnvConfig.JWT_EXPIRATION;
            const jwtSecret = DotEnvConfig.JWT_SECRET;
            const { id, email } = user;
            return jwt.sign({ id, email }, `${jwtSecret}`, {
                expiresIn,
            });
        }
}
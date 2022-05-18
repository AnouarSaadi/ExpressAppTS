import { NextFunction, Response } from "express";
import { ReqUser } from "../interface/req-uset.interface";
import { verify } from "jsonwebtoken";


export const authMiddleware = async (req: ReqUser, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_SECRET;
        try {
            const user = await verify(cookies.Authorization, `${secret}`);
            console.log(user);
        } catch(err) {
            res.status(400).send(err);
        }
    }
}

export class AuthMiddleware {
    
}
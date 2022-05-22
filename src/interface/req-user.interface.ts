import { Request } from "express";
import { User } from "../model/user.model";

export interface ReqUser extends Request {
    user: User;
}
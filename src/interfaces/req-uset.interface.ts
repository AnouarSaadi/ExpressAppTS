import { Request } from "express";
import { User } from "../models/user.model";

export interface ReqUser extends Request {
    user: User;
}
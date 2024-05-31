import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import { middlewareCheckRounters } from "./checkRountesWeb.js";
import { middlewareRouterAdmin } from './middlwareRoutes.js';
import { JWTverify } from "./JWTaction.js";
export const middlewareAuth = (req, res, next) => {
    const token = req.cookies.authToken;
    if (token) {
        const decoded = JWTverify(token, `${process.env.SECRETKEY}`);
        const dataToken = JSON.parse(decoded.data)[0];
        if (token) {
            if (dataToken.roleAccount === "user") {
                console.log(">>> CASE ROUTES USERS");
                return middlewareCheckRounters;
            }
            if (dataToken.roleAccount === "admin") {
                console.log(">>> THIS IS ROUTES ADMIN <<<");
                return middlewareRouterAdmin;
            }
        }
        else {
            console.log(">>> CASE ROUTES USERS");
            return middlewareCheckRounters;
        }
    }
    return middlewareCheckRounters;
};

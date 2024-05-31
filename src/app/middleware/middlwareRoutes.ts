import { Request, Response, NextFunction } from "express";
import initWebRouteAdmin from "../routes/adminRoutesWeb.js";

export function middlewareRouterAdmin (app: any){
    initWebRouteAdmin(app);
    app.use((req: Request, res: Response) => {
        return res.render("404.ejs");
    });
}
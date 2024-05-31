import { NextFunction, Request, Response } from 'express';
import { initWebRoute } from '../routes/web.js';
export function middlewareCheckRounters(app: any) {
    initWebRoute(app);
    app.use((req: Request, res: Response) => {
        return res.render("404.ejs");
    });
}
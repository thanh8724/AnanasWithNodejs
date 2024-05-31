import dotenv from 'dotenv';
declare module 'express';
dotenv.config();
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import configViewEngine from './config/viewEngine.js'; // cấu hình
import { middlewareAuth } from './middleware/auth.js';
import cookieParser from 'cookie-parser';
const app = express();
const port: any = process.env.PORT || 8081;
const hostname: any = process.env.HOST_NAME;
// config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
//config template engiene
configViewEngine(app);


// config cookies parsers
app.use(cookieParser());


// middlewareAuth();
app.use((req: Request, res: Response, next: NextFunction) => {
  const router = middlewareAuth(req, res, next);
  router(app);
  next();
})

app.listen(port, hostname, () => {
  console.log("=================");
  console.log(`>>> ${port}`);
  console.log("=================");
});

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import configViewEngine from './config/viewEngine.js'; // cấu hình
import webRoutes from './routes/web.js'; // import route controller
const app = express();
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME;
// config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
//config template engiene
configViewEngine(app);
app.use('/', webRoutes);
app.listen(port, hostname, () => {
    console.log("=================");
    console.log(`>>> ${port}`);
    console.log("=================");
});
//# sourceMappingURL=sever.js.map
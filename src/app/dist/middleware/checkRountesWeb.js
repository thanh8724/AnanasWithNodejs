import { initWebRoute } from '../routes/web.js';
export function middlewareCheckRounters(app) {
    initWebRoute(app);
    app.use((req, res) => {
        return res.render("404.ejs");
    });
}

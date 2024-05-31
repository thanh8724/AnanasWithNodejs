import initWebRouteAdmin from "../routes/adminRoutesWeb.js";
export function middlewareRouterAdmin(app) {
    initWebRouteAdmin(app);
    app.use((req, res) => {
        return res.render("404.ejs");
    });
}

import path from "path";
import express from "express";
import ejs from 'ejs';
const configViewEngine = (app) => {
    app.engine("ejs", ejs.renderFile); // Đặt EJS làm công cụ mẫu mặc định
    app.set("view engine", "ejs"); // Sử dụng EJS làm công cụ mẫu
    app.set("views", path.join('.app', 'views')); // Đường dẫn đến thư mục chứa các tệp EJS
    app.use(express.static(path.join('./app', 'public')));
    app.use(express.static(path.join('./app', 'dist')));
};
export default configViewEngine;
//# sourceMappingURL=viewEngine.js.map
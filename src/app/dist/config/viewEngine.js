import express from "express";
import ejs from 'ejs';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configViewEngine = (app) => {
    app.engine("ejs", ejs.renderFile); // Đặt EJS làm công cụ mẫu mặc định
    app.set("view engine", "ejs"); // Sử dụng EJS làm công cụ mẫu
    app.set("views", path.join('./src/app', 'views')); // Đường dẫn đến thư mục chứa các tệp EJS
    app.use(express.static(path.join('./src/app', './public')));
    app.use(express.static(path.join('./src/app', './dist')));
};
export default configViewEngine;

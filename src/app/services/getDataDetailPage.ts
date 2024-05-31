import {connectionDataBase} from "../config/database.js";
import { promises as fs } from "fs";

export async function createDataDetailPage(): Promise<any> {
    try {
        const pool = await connectionDataBase();
        const connection = await pool.getConnection();
        const [categories, categoriesFields] = await connection.query("select * from categories");
        const [products, productsFields] = await connection.query("select * from products");
        const [imagesDetail, imagesDetailFields] = await connection.query("select * from imageproducts");
        const dataDetailPage = {
            categories: categories,
            products: products,
            imagesDetail: imagesDetail
        }
        const jsonData = JSON.stringify(dataDetailPage, null, 2);
        await fs.writeFile('./src/json/dataDetailPage.json', jsonData);
        connection.release();
        pool.end();
    } catch (error) {
        console.error(error);
        return null;
    }
}
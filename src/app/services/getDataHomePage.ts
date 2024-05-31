import {connectionDataBase} from "../config/database.js";
import { promises as fs } from "fs";

export async function createDataHomePageJsonFile(): Promise<any> {
    try {
        const pool = await connectionDataBase();
        const connection = await pool.getConnection();
        const [categories, categoriesFields] = await connection.query("select * from categories");
        const [bestSaler, bestSalerFields] = await connection.query("select * from products where quantitySold >= 300");
        const [productInterest, productInterestFields] = await connection.query("select * from products where viewProduct >= 250");
        const dataHomePage = {
            categories: categories,
            bestSaler: bestSaler,
            productInterest: productInterest
        }        
        const jsonData = JSON.stringify(dataHomePage, null, 2);
        await fs.writeFile('./src/json/dataHomePage.json', jsonData);
        connection.release();
        pool.end();
    } catch (error) {
        console.error(error);
        return null;
    }
}
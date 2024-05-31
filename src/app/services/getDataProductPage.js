import connectionDataBase from "../config/database.js";
import { promises as fs } from "fs";
export async function createDataProductsPageJsonFile() {
    try {
        const pool = await connectionDataBase();
        const connection = await pool.getConnection();
        const [categories, categoriesFields] = await connection.query("select * from categories");
        const [products, productsFields] = await connection.query("select * from products");
        const dataProductsPage = {
            categories: categories,
            products: products
        };
        const jsonData = JSON.stringify(dataProductsPage, null, 2);
        await fs.writeFile('./app/json/dataProductsPage.json', jsonData);
        connection.release();
        pool.end();
        return dataProductsPage;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
//# sourceMappingURL=getDataProductPage.js.map
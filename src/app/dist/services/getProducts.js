// import connectionDataBase from "../config/database.js";
// import { promises as fs } from "fs";
export {};
// export async function createProductsJsonFile() {
//     try {
//         const pool = await connectionDataBase();
//         const connection = await pool.getConnection();
//         const [products, productsFields] = await connection.query("select * from products");
//         const productsData = {
//             products: products
//         }
//         const Jsondata = JSON.stringify(productsData, null, 2);
//         await fs.writeFile('./src/json/products.json', Jsondata); // Sửa đường dẫn tới file đích
//         connection.release();
//         pool.end();
//         return productsData;
//     } catch (error) {
//         console.error(error); // In ra thông báo lỗi đầy đủ
//     }
// }
//# sourceMappingURL=getProducts.js.map
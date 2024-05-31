// import connectionDataBase from "../config/database.js";
// import { promises as fs } from "fs";
export {};
// export async function createCategoriesJsonFile() {
//     try {
//         const pool = await connectionDataBase();
//         const connection = await pool.getConnection();
//         const [categories, categoriesFields] = await connection.query("select * from categories");
//         const categoriesData = {
//             categories: categories
//         }
//         const Jsondata = JSON.stringify(categoriesData, null, 2);
//         await fs.writeFile('./src/json/categories.json', Jsondata); // Sửa đường dẫn tới file đích
//         connection.release();
//         pool.end();
//         return categoriesData;
//     } catch (error) {
//         console.error(error); // In ra thông báo lỗi đầy đủ
//     }
// }
//# sourceMappingURL=getCategories.js.map
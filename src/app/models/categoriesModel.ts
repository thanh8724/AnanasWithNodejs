import { connectionDataBase } from "../config/database.js";
export async function insertDataCategory(data: any): Promise<void> {
    const pool = await connectionDataBase();
    const query = `INSERT INTO categories (nameCategory, imageCategory, descriptionCategory)
                    VALUES (?, ?, ?)`;
    const values = [data.nameCategory, data.imageUrl, ""];
    pool.query(query, values);
}
export async function deleteDataCategory(categoryId: string | number): Promise<any> {
    const pool = await connectionDataBase();    
    const query: string = `DELETE FROM categories WHERE id = ?`;
    const values: any[] = [categoryId];
    pool.query(query, values);
}
export async function updateDataCategory(categoryId: string | number, data: any): Promise<any> {
  const pool = await connectionDataBase();
  const query = `UPDATE categories SET nameCategory = ?, imageCategory = ?, descriptionCategory = ? WHERE id = ?`;
  const values = [data.nameCategory, data.imageUrl, data.descriptionCategory, categoryId];
  await pool.query(query, values);
}
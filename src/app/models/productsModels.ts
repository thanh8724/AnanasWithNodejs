import { connectionDataBase } from "../config/database.js";
export async function insertDataProduct(data: any): Promise<void> {
    const pool = await connectionDataBase();
    const query = `INSERT INTO products (id, imageProduct, nameProduct, priceProduct, categoriesProduct, descriptionProduct)
                    VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [data.id, data.image, data.name, data.price, data.categories, data.description];
    pool.query(query, values);
}
export async function insertDataImagesProduct(urlImage: string, idProduct: string | number): Promise<void> {
    const pool = await connectionDataBase();
    const query = `INSERT INTO imageproducts (imageDetail, idProduct)
                    VALUES (?, ?)`;
    const values = [urlImage, idProduct];
    await pool.query(query, values);
}
export async function deleteDataProduct(idProduct: string | number): Promise<any> {
    const pool = await connectionDataBase();    
    const query: string = `DELETE FROM products WHERE id = ?`;
    const values: any[] = [idProduct];
    pool.query(query, values);
}
export async function deleteDataImageDetail(idProduct: string | number): Promise<any> {
    const pool = await connectionDataBase();    
    const query: string = `DELETE FROM imageproducts WHERE idProduct = ?`;
    const values: any[] = [idProduct];
    await pool.query(query, values);
}
export async function updateDataProduct(idProduct: string | number, data: any): Promise<any> {
  const pool = await connectionDataBase();
  const query = `UPDATE products SET imageProduct = ?, nameProduct = ?, priceProduct = ?, categoriesProduct = ?, descriptionProduct = ? WHERE id = ?`;
  const values = [data.imageProduct, data.nameProduct, data.priceProduct, data.categoriesProduct, data.descriptionProduct, idProduct];
  await pool.query(query, values);
}
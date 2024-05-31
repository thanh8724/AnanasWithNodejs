import { connectionDataBase } from "../config/database.js";
export async function insertDataProduct(data) {
    const pool = await connectionDataBase();
    const query = `INSERT INTO products (id, imageProduct, nameProduct, priceProduct, categoriesProduct, descriptionProduct)
                    VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [data.id, data.image, data.name, data.price, data.categories, data.description];
    pool.query(query, values);
}
export async function insertDataImagesProduct(urlImage, idProduct) {
    const pool = await connectionDataBase();
    const query = `INSERT INTO imageproducts (imageDetail, idProduct)
                    VALUES (?, ?)`;
    const values = [urlImage, idProduct];
    await pool.query(query, values);
}
export async function deleteDataProduct(idProduct) {
    const pool = await connectionDataBase();
    const query = `DELETE FROM products WHERE id = ?`;
    const values = [idProduct];
    pool.query(query, values);
}
export async function deleteDataImageDetail(idProduct) {
    const pool = await connectionDataBase();
    const query = `DELETE FROM imageproducts WHERE idProduct = ?`;
    const values = [idProduct];
    await pool.query(query, values);
}
export async function updateDataProduct(idProduct, data) {
    const pool = await connectionDataBase();
    const query = `UPDATE products SET imageProduct = ?, nameProduct = ?, priceProduct = ?, categoriesProduct = ?, descriptionProduct = ? WHERE id = ?`;
    const values = [data.imageProduct, data.nameProduct, data.priceProduct, data.categoriesProduct, data.descriptionProduct, idProduct];
    await pool.query(query, values);
}

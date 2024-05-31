import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";
async function connectionDataBase() {
    const pool = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    return pool;
}
export default connectionDataBase;
export async function insertDataAccount(data) {
    const pool = await connectionDataBase();
    const query = `INSERT INTO accounts (nameAccount, emailAccount, passwordAccount, roleAccount)
                    VALUES (?, ?, ?, ?)`;
    const values = [data.nameAccount, data.emailAccount, data.passwordAccount, 'user'];
    pool.query(query, values);
}
//# sourceMappingURL=database.js.map
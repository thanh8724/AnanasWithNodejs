import { connectionDataBase } from "../config/database.js";
export async function insertDataAccount(data) {
    const pool = await connectionDataBase();
    const query = `INSERT INTO accounts (nameAccount, emailAccount, passwordAccount, roleAccount)
                    VALUES (?, ?, ?, ?)`;
    const values = [data.nameAccount, data.emailAccount, data.passwordAccount, 'user'];
    pool.query(query, values);
}
export async function insertDataAccountHaveImage(data) {
    const pool = await connectionDataBase();
    const query = `INSERT INTO accounts (nameAccount, emailAccount, passwordAccount, avatarAccount, roleAccount)
                    VALUES (?, ?, ?, ?, ?)`;
    const values = [data.nameAccount, data.emailAccount, data.passwordAccount, data.avatarAccount, data.roleAccount];
    pool.query(query, values);
}
export async function deleteDataAccount(idAccount) {
    const pool = await connectionDataBase();
    const query = `DELETE FROM accounts WHERE id = ?`;
    const values = [idAccount];
    pool.query(query, values);
}

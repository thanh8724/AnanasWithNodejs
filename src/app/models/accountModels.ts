import { connectionDataBase } from "../config/database.js";
export async function insertDataAccount(data: any): Promise<void> {
    const pool = await connectionDataBase();
    const query = `INSERT INTO accounts (nameAccount, emailAccount, passwordAccount, roleAccount)
                    VALUES (?, ?, ?, ?)`;
    const values = [data.nameAccount, data.emailAccount, data.passwordAccount, 'user'];
    pool.query(query, values);
}
export async function insertDataAccountHaveImage(data: any): Promise<void> {
    const pool = await connectionDataBase();
    const query = `INSERT INTO accounts (nameAccount, emailAccount, passwordAccount, avatarAccount, roleAccount)
                    VALUES (?, ?, ?, ?, ?)`;
    const values = [data.nameAccount, data.emailAccount, data.passwordAccount, data.avatarAccount, data.roleAccount];
    pool.query(query, values);
}
export async function deleteDataAccount(idAccount: string | number): Promise<any> {
    const pool = await connectionDataBase();    
    const query: string = `DELETE FROM accounts WHERE id = ?`;
    const values: any[] = [idAccount];
    pool.query(query, values);
}
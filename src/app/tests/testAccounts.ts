import {connectionDataBase} from "../config/database.js";
import { promises as fs } from "fs";
export async function getEmailAccounts(): Promise<any> {
    try {
        const pool = await connectionDataBase();
        const connection = await pool.getConnection();
        const [listAccounts, categoriesFields] = await connection.query("select emailaccount from accounts");
        connection.release();
        pool.end();
        return listAccounts;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export function checkEmailExists(newEmailRegister: string, listEmailExists: any): boolean {
  return listEmailExists.some((item: any) => item.emailaccount === newEmailRegister);
}
export async function checkAccountsLogin(email: string, password: string | number): Promise<any> {
  const data = await fs.readFile('./src/json/dataAccounts.json', 'utf-8');
  const listAccounts = JSON.parse(data).accounts;
  const account = listAccounts.filter((account: any) => {
    return account.emailAccount === email && account.passwordAccount === Number(password);
  });
  return account;
}
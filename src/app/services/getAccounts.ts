import {connectionDataBase} from "../config/database.js";
import { promises as fs } from "fs";
async function createDataAccountsJsonFile(): Promise<any> {
    try {
        const pool = await connectionDataBase();
        const connection = await pool.getConnection();
        const [accounts, accountsFields] = await connection.query("select * from accounts");
        const dataAccounts = {
            accounts: accounts,
        }
        const jsonData = JSON.stringify(dataAccounts, null, 2);
        await fs.writeFile('./src/json/dataAccounts.json', jsonData);
        connection.release();
        pool.end();
        return dataAccounts;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export default createDataAccountsJsonFile;
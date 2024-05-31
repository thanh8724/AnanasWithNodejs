import {connectionDataBase} from "../config/database.js";
import { promises as fs } from "fs";

export async function createDataBillsJsonFile(): Promise<any> { // nào cần thì import rồi gọi nó lại vd: await createDataBillsJsonFile();, nhớ để "await" trước hàm cho chắc
    try {
        const pool = await connectionDataBase();
        const connection = await pool.getConnection();
        const [bills, billsFields] = await connection.query("select * from bills");
        const [productbill, productbillFields] = await connection.query("select * from productbill");
        const dataHomePage = { // tạo đối tượng có key - value cần có trong file json
            bills: bills,
            productbill: productbill
        }        
        const jsonData = JSON.stringify(dataHomePage, null, 2); // nén nó thành string để xuống dưới ép vô file json
        await fs.writeFile('./src/json/dataBills.json', jsonData); // Dòng này tạo file json nè, phải dẫn đúng đường dẫn cho nó
        connection.release();
        pool.end();
    } catch (error) {
        console.error(error);
        return null;
    }
}
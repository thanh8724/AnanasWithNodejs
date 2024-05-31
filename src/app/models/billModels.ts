import { connectionDataBase } from "../config/database.js";
export async function insertDataBill(data: any): Promise<void> {
    const pool = await connectionDataBase();
    const query = `INSERT INTO bills (id, idAccount, receiver, emailReceiver, phoneReceiver, address, adderssSpecific, totalAmount, shipping, status, paymentMethod)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [data.id, data.idAccount, data.receiver, data.emailReceiver,data.phoneReceiver,data.address,data.adderssSpecific,data.totalAmount,data.shipping,data.status,data.paymentMethod,];
    pool.query(query, values);
}
export async function updateBill(idOrder: string | number, newStatus: string): Promise<any> {
  const pool = await connectionDataBase();
  const query = `UPDATE bills SET status = ? WHERE id = ?`;
  const values = [newStatus,  idOrder];
  await pool.query(query, values);
}
export async function insertNameProductBill(data: any): Promise<void> {
    const pool = await connectionDataBase();
    const query = `INSERT INTO productbill (nameProduct, idBill)
                    VALUES (?, ?)`;
    const values = [data.nameProduct, data.idBill];
    await pool.query(query, values);
}
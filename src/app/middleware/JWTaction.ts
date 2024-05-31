import dotenv from 'dotenv';
import e from 'express';
dotenv.config();
import jwt from 'jsonwebtoken';
const secretKey: string | undefined = process.env.SECRETKEY
export function createJWT(data: any) {
    let token: any;
    try {
        token = jwt.sign({data}, `${secretKey}`, { expiresIn: "24h"});
    }catch (err) {
        console.log(err);
    }
    return token;
}
export function JWTverify (token: string, secretKey: string) {
    let data: any = null;
    try {
        let decoded = jwt.verify(token, secretKey);
        data = decoded;
    }catch (err) {
        console.log(err);
    }
    return data;
}
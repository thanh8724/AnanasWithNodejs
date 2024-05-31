import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRETKEY;
export function createJWT(data) {
    let token;
    try {
        token = jwt.sign({ data }, `${secretKey}`, { expiresIn: "24h" });
    }
    catch (err) {
        console.log(err);
    }
    return token;
}
export function JWTverify(token, secretKey) {
    let data = null;
    try {
        let decoded = jwt.verify(token, secretKey);
        data = decoded;
    }
    catch (err) {
        console.log(err);
    }
    return data;
}

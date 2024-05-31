import dotenv from 'dotenv';
dotenv.config();
export const middlewareController = {
    verifiToken: (req, res, next) => {
        const token = req.params.authToken;
    }
};

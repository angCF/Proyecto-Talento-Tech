import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');
export interface CustomRequest extends Request {
    _id?: number;
};
const validateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "No token provided"
        });
    }
    try{
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);
        req._id  = _id;
        next();
    }catch(err){
        return res.status(401).json({
            ok: false,
            message: "Invalid token"
        });
    }
};

export const validatePassJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('x-token-pass');
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "No token provided"
        });
    }
    try{
        const {_id} = jwt.verify(token, process.env.JWT_SECRET_PASS);
        req._id  = _id;
        next();
    }catch(err){
        return res.status(401).json({
            ok: false,
            message: "Invalid token"
        });
    }
};
export default validateJWT;
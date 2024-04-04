import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from 'bcryptjs';
import { CustomRequest } from "../middlewares/validate-jwt";
import generateJWT from "../helpers/jwt";

export const login = async (req: Request, res: Response) => {
    try {
        const { login, password } = req.body;
        //Verificar login
        const userLogin = await UserModel.findOne({ login: login });
        if (!userLogin) {
            res.status(401).json({
                ok: false,
                msg: 'Invalid credentials'
            });
        }
        //Verificar password
        console.log('Calve usuer',userLogin.password);
        
        const userPassword = bcrypt.compareSync(password, userLogin.password);
        console.log('Calve body',userPassword);
        if (!userPassword) {
            res.status(401).json({
                ok: false,
                msg: 'Invalid credentials'
            });
        }
        //Generar jwt
        if (userLogin._id) {
            const token = await generateJWT(userLogin._id, userLogin.login);
            res.status(200).json({
                ok: true,
                user: userLogin,
                token: token
            });
        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error
        });
    }
}
export const recoveAccess = async (req: Request, res: Response) => {
    try {
        const { email, documentNumber } = req.body;
        //Verificar login
        const userLogin = await UserModel.findOne({ email: email, documentNumber: documentNumber });
        if (!userLogin) {
            res.status(401).json({
                ok: false,
                msg: 'User not found'
            });
        }
        //Generar jwt
        if (userLogin._id) {
            const token = await generateJWT(userLogin._id, userLogin.login, '12h', process.env.JWT_SECRET_PASS);
            res.status(200).json({
                ok: true,
                user: userLogin,
                token: token
            });
        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error
        });
    }
}
export const resetPassword = async (req: CustomRequest, res: Response) => {
    try {
        const id = req._id;
        const { password } = req.body;
        
        const salt = bcrypt.genSaltSync(10);
        const newPassword = bcrypt.hashSync(password, salt);
        console.log(newPassword);

        const newUser = await UserModel.findByIdAndUpdate(id,{ password: newPassword });
        if(!newUser){
            res.status(400).json({
                ok: false,
                msg: 'Error updating password'
            });
        }
        res.status(200).json({
            ok: true,
            message: "Password updated successfully",
            user: newUser
        });
        
    } catch (err) {
        res.status(400).json({
            ok: false,
            message: 'Error updating password',
            err
        });
    }
}
export const renovateToken = async (req: CustomRequest, res: Response) => {
    try {
        const id = req._id;
        if (typeof id === "undefined") {
            throw new Error('Id is undefined');
        }
        const user = await UserModel.findById(id);
        if (!user) {
            res.status(401).json({
                ok: false,
                msg: 'User not found'
            });
        }
        //Generar jwt
        const newToken = await generateJWT(id.toString());
        res.status(200).json({
            ok: true,
            user: user,
            token: newToken
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error
        });
    }
}
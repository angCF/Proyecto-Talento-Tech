import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from 'bcryptjs';

export const createdUser = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const { documentNumber, login, password } = body;
        const existLogin = await UserModel.findOne({
            login: login
        });
        if (existLogin) {
            return res.status(409).json({
                ok: false,
                message: `User ${login} already exists`
            });
        }
        const existDocument = await UserModel.findOne({
            documentNumber : documentNumber
        });
        if (existDocument) {
            return res.status(409).json({
                ok: false,
                message: `User with document ${documentNumber} already exists`
            });
        }
        const newUser = new UserModel({
            ...body
        })
        //Cuantos saltos va a hacer al encriptar
        const salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(password,salt);
        console.log(newUser.password);

        const createdUser = await newUser.save();
        res.status(200).json({
            ok: true,
            message: "User created successfully",
            newUser: createdUser
        });
    } catch (err) {
        res.status(400).json({
            ok: false,
            message: 'Error creating user',
            err
        });
    }
}
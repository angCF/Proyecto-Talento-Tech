import { Request, Response } from "express";
import CustomerModel from "../models/customer.model";

export const createCustomer = async (req: Request, res: Response) => {
    const { body } = req;
    try{
        console.log(req);
        console.log(body);
        const newCustomer = new CustomerModel (body);
        const createdCustomer = await newCustomer.save();
        res.status(200).json({
            ok: true,
            message: "Customer created successfully",
            newCustomer: createdCustomer
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error creating customer",
            error: err
        });
    }
};

export const getAllCustomers = async (req: Request, res: Response) => {
    try{
        //Busca todos los clientes
        const customers = await CustomerModel.find();
        res.status(200).json({
            ok: true,
            message: "All customers",
            customers: customers
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error getting all customers",
            error: err
        });
    }
};
export const getCustomer = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        console.log(id);
        const customer = await CustomerModel.findById({_id:id});
        res.status(200).json({
            ok: true,
            message: "Customer",
            customer: customer
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error getting customer",
            error: err
        });
    }
};
export const updateCustomer = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const { body } = req;
        //,{new:true} devuelve lo nuevo
        const customer = await CustomerModel.findByIdAndUpdate({_id:id},body);
        res.status(200).json({
            ok: true,
            message: "Customer updated successfully",
            customer: customer
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error updating customer",
            error: err
        });
    }
};
export const deleteCustomer = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await CustomerModel.findByIdAndDelete({_id:id});
        res.status(200).json({
            ok: true,
            message: "Customer deleted successfully"
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error deleting customer",
            error: err
        });
    }
};
export const updateStateCustomer = async (req: Request, res:Response) => {
    try{
        const id = req.params.id;
        const { body } = req;
        const customer = await CustomerModel.findByIdAndUpdate({_id:id},{state:false},{new:true});
        res.status(200).json({
            ok: true,
            message: "Customer updated successfully",
            customer: customer
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error updating customer",
            error: err
        });
    }
};
export const getActiveCustomers = async (req: Request, res:Response) => {
    try{
        const state = true;
        const customers = await CustomerModel.find({state:state});
        res.status(200).json({
            ok: true,
            message: "All active customers",
            customers: customers
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error getting all active customers",
            error: err
        });
    }
};
export const getInactiveCustomers = async (req: Request, res:Response) => {
    try{
        const state = false;
        const customers = await CustomerModel.find({state:state});
        res.status(200).json({
            ok: true,
            message: "All inactive customers",
            customers: customers
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error getting all inactive customers",
            error: err
        });
    }
};
import { Request, Response } from "express";
import OpportunityModel from "../models/opportunity.model";
import { CustomRequest } from "../middlewares/validate-jwt";

export const createOpportunity = async (req: CustomRequest, res: Response) => {
    const { body } = req;
    const id = req._id;
    try{
        console.log(req);
        console.log(body);
        const newOpportunity = new OpportunityModel ({user:id, ...body});
        const createdOpportunity = await newOpportunity.save();
        res.status(200).json({
            ok: true,
            message: "Opportunity created successfully",
            newOpportunity: createdOpportunity
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error creating opportunity",
            error: err
        });
    }
};

export const getAllOpportunities = async (req: Request, res: Response) => {
    try{
        //Busca todos las oportunidades
        const opportunities = await OpportunityModel.find()
        .populate({path:'customer', select: 'documentNumber'});
        res.status(200).json({
            ok: true,
            message: "All opportunities",
            opportunities: opportunities
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error getting all opportunities",
            error: err
        });
    }
};
export const getOpportunity = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        console.log(id);
        const opportunity = await OpportunityModel.findById({_id:id});
        res.status(200).json({
            ok: true,
            message: "Opportunity",
            opportunity: opportunity
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error getting opportunity",
            error: err
        });
    }
};
export const updateOpportunity = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const { body } = req;
        //,{new:true} devuelve lo nuevo
        const opportunity = await OpportunityModel.findByIdAndUpdate({_id:id},body);
        res.status(200).json({
            ok: true,
            message: "Opportunity updated successfully",
            opportunity: opportunity
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error updating opportunity",
            error: err
        });
    }
};
export const deleteOpportunity = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await OpportunityModel.findByIdAndDelete({_id:id});
        res.status(200).json({
            ok: true,
            message: "Opportunity deleted successfully"
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error deleting opportunity",
            error: err
        });
    }
};
export const updateStateOpportunity = async (req: Request, res:Response) => {
    try{
        const id = req.params.id;
        const { body } = req;
        const opportunity = await OpportunityModel.findByIdAndUpdate({_id:id},{state:false},{new:true});
        res.status(200).json({
            ok: true,
            message: "Opportunity updated successfully",
            opportunity: opportunity
        });
    }catch(err){
        res.status(400).json({
            ok: false,
            message: "Error updating opportunity",
            error: err
        });
    }
};
// export const getActiveCustomers = async (req: Request, res:Response) => {
//     try{
//         const state = true;
//         const customers = await CustomerModel.find({state:state});
//         res.status(200).json({
//             ok: true,
//             message: "All active customers",
//             customers: customers
//         });
//     }catch(err){
//         res.status(400).json({
//             ok: false,
//             message: "Error getting all active customers",
//             error: err
//         });
//     }
// };
// export const getInactiveCustomers = async (req: Request, res:Response) => {
//     try{
//         const state = false;
//         const customers = await CustomerModel.find({state:state});
//         res.status(200).json({
//             ok: true,
//             message: "All inactive customers",
//             customers: customers
//         });
//     }catch(err){
//         res.status(400).json({
//             ok: false,
//             message: "Error getting all inactive customers",
//             error: err
//         });
//     }
// };
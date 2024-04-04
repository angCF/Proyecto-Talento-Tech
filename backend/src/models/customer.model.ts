import { model, Model, Schema } from "mongoose";
import { Interaction } from "../interfaces/interaction.interface";

interface CustomerInterface{
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    documentType: string;
    documentNumber: string;
    city: string;
    state: boolean;
    createdAt: Date;
    updatedAt: Date;
    interactionHistory: Interaction[];
}
const CustomerSchema = new Schema<CustomerInterface>({
    name: {
        type: String,
        required: true
    },
    lastName: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    documentType: {
        type: String,
        required: true
    },
    documentNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    interactionHistory: {
        type: [Object]
    }
});

const CustomerModel: Model<CustomerInterface> = model('customers', CustomerSchema);

export default CustomerModel;
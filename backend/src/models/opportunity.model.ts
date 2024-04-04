import { model, Model, Schema, Types } from "mongoose";

interface OpportunityInterface{
    name: string;
    description: string;
    state: string;
    createdAt: Date;
    updateAt: Date;
    customer: Types.ObjectId;
    user: Types.ObjectId;
}
const OpportunitySchema = new Schema<OpportunityInterface>({
    name: {
        type: String,
        required: true
    },
    description: { 
        type: String, 
        required: true
    },
    state: {
        type: String, 
        required: true,
        default: 'In progress'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customers',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});
const OpportunityModel: Model<OpportunityInterface> = model<OpportunityInterface>('opportunities', OpportunitySchema);

export default OpportunityModel;
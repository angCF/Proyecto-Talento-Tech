import { model, Model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    documentType: {
        type: String,
        required: true
    },
    documentNumber: {
        type: String,
        required: true,
        unique: true
    },
    rol: {
        type: String,
        required: true,
        default: 'ADMIN'
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const UserModel: Model<any> = model('users', UserSchema);

export default UserModel;
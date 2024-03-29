import mongoose from "mongoose"

export const dbConnection = async () => {
    try {
        const connection = process.env.DB_CONNECTION
        if (!connection){
            throw new Error('Error connecting to database')
        }
        await mongoose.connect(connection);
        console.log('Connected to database');
    }catch (error) {
        console.log(error)
    }
}
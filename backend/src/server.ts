import express, { Application } from "express";
import { dbConnection } from "./database/connection";
// Exportar la clase
export class Server {
    private app: Application;
    private port: string;
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';

        dbConnection();
    }
    listen(): void{
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
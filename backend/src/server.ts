import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import  customerRoutes from "./routes/customer.route"
import  userRoutes from "./routes/user.route"
import  authRoutes from "./routes/auth.route"
import  opportunityRoutes from "./routes/opportunity.route"
import cors from "cors";
// Exportar la clase
export class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        customer: '/api/v1/customer',
        user: '/api/v1/user',
        auth: '/api/v1/auth',
        opportunity: '/api/v1/opportunity'  
    };
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        //Base de datos
        dbConnection();
        //Metodos iniciales
        this.middlewares();
        //Rutas
        this.routes();
    }
    home(){
        this.app.get('/', (req: Request, res: Response) => {
            res.status(200).json({ msg: 'Information'});
        });
    }
    middlewares(){
        this.app.use(cors());
        //Convertir todo a json
        this.app.use(express.json());
        this.home();
    }
    routes(): void {
        //Use esta ruta
        this.app.use(this.apiPaths.customer, customerRoutes);
        this.app.use(this.apiPaths.user, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.opportunity, opportunityRoutes);
    }
    listen(): void{
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
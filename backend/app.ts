import { Server } from "./src/server";
import dotenv from "dotenv";
//Configurar variables de entorno
dotenv.config();

const server = new Server();
server.listen();
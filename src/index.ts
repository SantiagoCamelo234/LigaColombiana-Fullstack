import express from "express";
import { connectDB } from "./connectDB";
import teamRouter from "./routes/team.route"
import matchRouter from "./routes/match.router";
import cors from "cors"
import morgan from "morgan"
const app = express();
const PORT = 3001;

app.use(cors());
app.use(morgan("dev"))
app.use(express.json());
app.use("/api", teamRouter)
app.use("/api", matchRouter)
const startServer = async () => {
    await connectDB()
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
    });
    
}

startServer();

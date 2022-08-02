import express from "express";
import "./database/conexion.js";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);

//solo para testear login/token
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log("🚀🚀🚀 http://localhost:" + PORT));

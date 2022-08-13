import "dotenv/config";
import express from "express";
import "./database/conexion.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js"
import redirectRouter from "./routes/redirect.route.js"

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

app.use(cors({
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            return callback(null, origin)
        }
        return callback("Error de CORS origin: " + origin + " No autorizado!"
        );
    }
}));
app.use(express.json());
app.use(cookieParser());
// Ejemplo back redirect (Opcional  )
app.use("/", redirectRouter)
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);

//solo para testear login/token
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log("🚀🚀🚀 http://localhost:" + PORT));

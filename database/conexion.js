import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Conexion DB ✅"))
.catch((e) => console.log("Ha ocurrido un error en la conexion "  + e));

// try {
//   await mongoose.connect(process.env.MONGO_URL);
//   console.log('Conexion DB ✅');
// } catch (error) {
//   console.log('A ocurrido un error en la conexión ' + error);
// }
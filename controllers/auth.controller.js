import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //alternativa buscando por email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    //jwt token

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    //alternativa por defecto mongoose
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe este usuario" });

    const responsePassword = await user.comparePassword(password);
    if (!responsePassword)
      return res.status(403).json({ error: "Contraseña incorrecta" });

    //Generar el JWT Token
    const { token, expiresIn } = generateToken(user.id);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid);
    return res.json({ email: user.email, uid: user._id });
  } catch (error) {
    return res.status(500).json({ error: "Error de servidor" });
  }
};

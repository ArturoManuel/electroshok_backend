import jwt from "jsonwebtoken";
import { JWT_EXPIRES, JWT_SECRET } from "../utils/constants.js";

export const generateToken = (user) => {
  console.log("a: ", JWT_SECRET);
  return jwt.sign(
    {
      id_usuario: user.id_usuario,
      correo_electronico: user.correo_electronico,
      rol: user.rol,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Token invalido o expirado");
  }
};

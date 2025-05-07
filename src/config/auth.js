import jwt from "jsonwebtoken";
import {
  JWT_EXPIRES,
  JWT_REFRESH_EXPIRES,
  JWT_REFRESH_SECRET,
  JWT_SECRET,
} from "../utils/constants.js";

export const generateToken = (user) => {
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

export const generateRefreshToken = function (user) {
  return jwt.sign({ id_usuario: user.id_usuario }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES,
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Token invalido o expirado");
  }
};

export const verifyRefreshToken = function (token) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};

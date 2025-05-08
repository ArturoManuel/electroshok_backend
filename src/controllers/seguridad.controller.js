import bcrypt from "bcrypt";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from "../config/auth.js";
import { SeguridadServices } from "../services/seguridad.services.js";
import { UsuarioServices } from "../services/usuario.services.js";

export const login = async (req, res) => {
  console.log(`Login user `, req.body);
  const credenciales = req.body;
  try {
    const usuarios = await SeguridadServices.login(credenciales);
    if (usuarios.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    const usuario = usuarios[0];
    const esValida = await bcrypt.compare(
      credenciales.contrasena,
      usuario.contrasena
    );
    if (!esValida) {
      const numIntentos = usuario.intentos + 1;
      await SeguridadServices.updateIntentos(usuario.id_usuario, numIntentos);
      if (numIntentos >= 3) {
        await SeguridadServices.block(usuario.id_usuario);
        return res.status(401).json({ mensaje: "Usuario bloqueado" });
      }
      return res.status(401).json({
        mensaje: "Contraseña incorrecta",
        numIntentos: numIntentos,
      });
    }
    const userToken = generateToken(usuario);
    const userRefreshToken = generateRefreshToken(usuario);
    res.json({
      mensaje: "Inicio de sesión exitoso",
      token: userToken,
      refreshToken: userRefreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al iniciar sesion",
      error: error.toString(),
    });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token requerido" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const usuarios = await UsuarioServices.getById(decoded.id_usuario);
    if (usuarios[0]) {
      //usuario validado

      let token = generateToken(usuarios[0]);
      console.log("token: " + token);
      res.json({
        token,
        user: {
          id_usuario: usuarios[0].id_usuario,
          correo_electronico: usuarios[0].correo_electronico,
          rol: usuarios[0].rol,
        },
      });
    } else {
      res.status(403).json({ error: "Acceso no autorizado" });
    }
  } catch (error) {
    res.status(error.name == "TokenExpiredError" ? 401 : 403).json({
      message: "Error al refrescar token",
      error: error.toString(),
    });
  }
};

export const blockUser = async (req, res) => {
  console.log(`Blocking user `, req.body);
  const usuario = req.body;
  try {
    const updatedRows = await SeguridadServices.block(usuario.id_usuario);
    res.status(200).json({
      message: `Usuarios afectados: ${updatedRows}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al bloquear usuario",
      error: error.toString(),
    });
  }
};

export const unblockUser = async (req, res) => {
  console.log(`Unblocking user `, req.body);
  const usuario = req.body;
  try {
    const updatedRows = await SeguridadServices.unblock(usuario.id_usuario);
    res.status(200).json({
      message: `Usuarios afectados: ${updatedRows}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al desbloquear usuario",
      error: error.toString(),
    });
  }
};

export const SeguridadController = {
  login,
  refreshToken,
  blockUser,
  unblockUser,
};

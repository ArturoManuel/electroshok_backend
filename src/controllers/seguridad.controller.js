import bcrypt from "bcrypt";
import { generateToken } from "../config/auth.js";
import * as SeguridadServices from "../services/seguridad.services.js";

export const login = (req, res) => {
  console.log(`Login user `, req.body);
  const credenciales = req.body;
  SeguridadServices.getUsuarioByCorreo(credenciales)
    .then(async (usuarios) => {
      if (usuarios.length === 0)
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      const usuario = usuarios[0];
      console.log("usuario: ", usuario);
      const esValida = await bcrypt.compare(
        credenciales.contrasena,
        usuario.contrasena
      );
      if (!esValida) {
        const numIntentos = usuario.intentos + 1;
        if (numIntentos >= 3 || usuario.esta_activo === 0) {
          SeguridadServices.block(usuario.id_usuario)
            .then((resultado) => {
              res.status(201).json({ mensaje: "Usuario bloqueado" });
            })
            .catch((error) => {
              res.status(500).json({
                message: "Error al bloquear usuario",
                error: error.toString(),
              });
            });
          return;
        }
        SeguridadServices.updateIntentos(usuario.id_usuario)
          .then((result) => {
            res.status(400).json({
              mensaje: "Contraseña incorrecta",
              numIntentos: numIntentos,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Error al bloquear usuario",
              error: error.toString(),
            });
          });
        return;
      }
      const userToken = generateToken(usuario);
      res.json({
        mensaje: "Inicio de sesión exitoso",
        token: userToken,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Error al iniciar sesion",
        error: error.toString(),
      });
    });
};

export const blockUser = (req, res) => {
  console.log(`Blocking user `, req.body);
  const usuario = req.body;
  SeguridadServices.block(usuario.id_usuario)
    .then((resultado) => {
      res.status(201).json({ mensaje: "Usuario bloqueado" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al bloquear usuario",
        error: error.toString(),
      });
    });
};

export const unblockUser = (req, res) => {
  console.log(`Unblocking user `, req.body);
  const usuario = req.body;
  SeguridadServices.unblock(usuario.id_usuario)
    .then((resultado) => {
      res.status(201).json({ mensaje: "Usuario desbloqueado" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al desbloquear usuario",
        error: error.toString(),
      });
    });
};

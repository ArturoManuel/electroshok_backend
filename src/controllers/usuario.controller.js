import * as UsuarioServices from "../services/usuario.services.js";

export const getAll = (req, res) => {
  console.log(`Sending all users`);
  UsuarioServices.getAll()
    .then((results) => {
      res.json(results || []);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al obtener usuarios",
        error: error.toString(),
      });
    });
};

export const getById = (req, res) => {
  console.log(`Sending user with id ${req.params.id}`);
  const id_usuario = req.params.id;
  UsuarioServices.getById(id_usuario)
    .then((results) => {
      res.json(results[0] || {});
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error al obtener usuario con id: ${req.params.id}`,
        error: error.toString(),
      });
    });
};

export const create = (req, res) => {
  console.log(`Creating user `, req.body);
  const usuario = req.body;
  UsuarioServices.create(usuario)
    .then((resultado) => {
      res.status(201).json({ mensaje: "Usuario creado" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error al crear usuario", error: error.toString() });
    });
};

export const updateById = (req, res) => {
  console.log(`Updating user `, req.params.id);
  const id_usuario = req.params.id;
  const usuario = req.body;
  UsuarioServices.updateById(id_usuario, usuario)
    .then((resultado) => {
      res.status(201).json({ mensaje: "Usuario actualizado" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al actualizar usuario",
        error: error.toString(),
      });
    });
};

export const deleteById = (req, res) => {
  console.log(`Deleting user `, req.params.id);
  const id_usuario = req.params.id;
  UsuarioServices.deleteById(id_usuario)
    .then((resultado) => {
      res.status(201).json({ mensaje: "Usuario eliminado" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al eliminar usuario",
        error: error.toString(),
      });
    });
};

import { UsuarioServices } from "../services/usuario.services.js";

const getAll = async (req, res) => {
  console.log(`Sending all users`);
  try {
    const results = await UsuarioServices.getAll();
    res.json(results || []);
  } catch (error) {
    console.log("Error in get all users");
    res.status(500).json({
      message: "Error al obtener usuarios",
      error: error.toString(),
    });
  }
};

const getById = async (req, res) => {
  console.log(`Sending user with id ${req.params.id}`);
  try {
    const id_usuario = req.params.id;
    const results = await UsuarioServices.getById(id_usuario);
    res.json(results[0] || {});
  } catch (error) {
    console.log("Error in get user by id");
    res.status(500).json({
      message: `Error al obtener usuario con id: ${req.params.id}`,
      error: error.toString(),
    });
  }
};

const create = async (req, res) => {
  console.log(`Creating user `, req.body);
  try {
    const usuario = req.body;
    const createdId = await UsuarioServices.create(usuario);
    res.status(201).json({ mensaje: "Usuario creado", id: createdId });
  } catch (error) {
    console.log("Error in create user");
    res
      .status(500)
      .json({ message: "Error al crear usuario", error: error.toString() });
  }
};

const updateById = async (req, res) => {
  console.log(`Updating user `, req.params.id);
  try {
    const id_usuario = req.params.id;
    const usuario = req.body;
    const updatedRows = await UsuarioServices.updateById(id_usuario, usuario);
    res
      .status(201)
      .json({ mensaje: "Usuario actualizado", updatedRows: updatedRows });
  } catch (error) {
    console.log("Error in update user");
    res.status(500).json({
      message: "Error al actualizar usuario",
      error: error.toString(),
    });
  }
};

const deleteById = async (req, res) => {
  console.log(`Deleting user `, req.params.id);
  try {
    const id_usuario = req.params.id;
    const updatedRows = await UsuarioServices.deleteById(id_usuario);
    res
      .status(201)
      .json({ mensaje: "Usuario eliminado", updatedRows: updatedRows });
  } catch (error) {
    console.log("Error in delete user");
    res.status(500).json({
      message: "Error al eliminar usuario",
      error: error.toString(),
    });
  }
};

export const UsuarioController = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

import bcrypt from "bcrypt";
import { UsuarioModel } from "../models/usuario.model.js";

const getAll = async () => {
  try {
    const results = await UsuarioModel.findAll();
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getById = async (id_usuario) => {
  try {
    const results = await UsuarioModel.findById(id_usuario);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async (usuario) => {
  try {
    const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
    const newUsuario = {
      nombre: usuario.nombre,
      correo_electronico: usuario.correo_electronico,
      contrasena: hashedPassword,
      rol: usuario.rol || "cliente",
    };
    const id_usuario = await UsuarioModel.create(newUsuario);
    return id_usuario;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateById = async (id_usuario, usuario) => {
  try {
    const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
    const updatedUsuario = {
      nombre: usuario.nombre,
      correo_electronico: usuario.correo_electronico,
      contrasena: hashedPassword,
      rol: usuario.rol || "cliente",
    };
    const updatedRows = await UsuarioModel.updateById(
      id_usuario,
      updatedUsuario
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteById = async (id_usuario) => {
  try {
    const updatedRows = await UsuarioModel.block(id_usuario);
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UsuarioServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

import bcrypt from "bcrypt";
import { UsuarioModel } from "../models/usuario.model.js";

export const getAll = async () => {
  const results = await UsuarioModel.findAll();
  return results;
};

export const getById = async (id_usuario) => {
  const results = await UsuarioModel.findById(id_usuario);
  return results;
};

export const create = async (usuario) => {
  const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
  const newUsuario = {
    nombre: usuario.nombre,
    correo_electronico: usuario.correo_electronico,
    contrasena: hashedPassword,
    rol: usuario.rol || "cliente",
  };
  const id_usuario = await UsuarioModel.create(newUsuario);
  return id_usuario;
};

export const updateById = async (id_usuario, usuario) => {
  const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
  const updatedUsuario = {
    nombre: usuario.nombre,
    correo_electronico: usuario.correo_electronico,
    contrasena: hashedPassword,
    rol: usuario.rol || "cliente",
  };
  const results = await UsuarioModel.updateById(id_usuario, updatedUsuario);
  return results;
};

export const deleteById = async (id_usuario) => {
  const results = await UsuarioModel.block(id_usuario);
  return results;
};

export const UsuarioServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

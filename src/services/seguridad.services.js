import pool from "../config/db.js";
import { UsuarioModel } from "../models/usuario.model.js";

const login = async (credenciales) => {
  const results = await UsuarioModel.login(credenciales);
  return results;
};

export const getUsuarioById = async (id_usuario) => {
  const results = await UsuarioModel.findById(id_usuario);
  return results;
};

export const block = async (id_usuario) => {
  const results = await UsuarioModel.block(id_usuario);
  return results;
};

export const unblock = async (id_usuario) => {
  const results = await UsuarioModel.unblock(id_usuario);
  return results;
};

export const updateIntentos = async (id_usuario, numIntentos) => {
  const results = await UsuarioModel.updateIntentos(id_usuario, numIntentos);
  return results;
};

export const SeguridadServices = {
  login,
  getUsuarioById,
  unblock,
  block,
  updateIntentos,
};

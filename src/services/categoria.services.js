import { CategoriaModel } from "../models/categoria.model.js";

const getAll = async () => {
  try {
    const results = await CategoriaModel.findAll();
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getById = async (id_categoria) => {
  try {
    const results = await CategoriaModel.findById(id_categoria);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async (dataCategoria) => {
  try {
    const id_categoria = await CategoriaModel.create(dataCategoria);
    return id_categoria;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateById = async (id_categoria, dataCategoria) => {
  try {
    const updatedRows = await CategoriaModel.updateById(
      id_categoria,
      dataCategoria
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteById = async (id_categoria) => {
  try {
    const updatedRows = await CategoriaModel.deleteById(id_categoria);
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CategoriaServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

import { ProductoModel } from "../models/producto.model.js";

const getAll = async () => {
  try {
    const results = await ProductoModel.getAll();
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getById = async (id_producto) => {
  try {
    const results = await ProductoModel.getById(id_producto);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async (dataProducto) => {
  try {
    const producto = await ProductoModel.create(dataProducto);
    return producto.id_producto;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateById = async (id_producto, dataProducto) => {
  try {
    const updatedRows = await ProductoModel.updateById(
      id_producto,
      dataProducto
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteById = async (id_producto) => {
  try {
    const updatedRows = await ProductoModel.deleteById(id_producto);
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CatalogoServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

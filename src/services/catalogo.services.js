import { uploadProductImage } from "../config/multer.js";
import { ProductoModel } from "../models/producto.model.js";
import { getArchivo } from "../utils/archivos.js";

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
    const id_producto = await ProductoModel.create(dataProducto);
    return id_producto;
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

const uploadImage = async (req, res) => {
  try {
    await uploadProductImage(req, res);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const downloadImage = async (id_producto) => {
  try {
    const results = await ProductoModel.getById(id_producto);
    if (results.length === 0) throw new Error("Producto no encontrado");
    const product = results[0];
    return getArchivo(product.url_imagen);
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
  uploadImage,
  downloadImage,
};

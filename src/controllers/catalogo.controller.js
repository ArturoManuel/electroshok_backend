import fs from "fs";
import { CatalogoServices } from "../services/catalogo.services.js";

const getAll = async (req, res) => {
  console.log(`Sending all products`);
  try {
    const results = await CatalogoServices.getAll();
    res.json(results || []);
  } catch (error) {
    console.log("Error in get all products");
    res.status(500).json({
      message: "Error al obtener productos",
      error: error.toString(),
    });
  }
};

const getById = async (req, res) => {
  console.log(`Sending product by id `, req.params.id);
  try {
    const id_producto = req.params.id;
    const results = await CatalogoServices.getById(id_producto);
    res.json(results[0] || {});
  } catch (error) {
    console.log("Error in get producto by id");
    res.status(500).json({
      message: `Error al obtener producto con id: ${req.params.id}`,
      error: error.toString(),
    });
  }
};

const create = async (req, res) => {
  console.log(`Creating product `, req.body);
  try {
    const dataProducto = req.body;
    const createdId = await CatalogoServices.create(dataProducto);
    res.status(201).json({ message: "Producto creado", id: createdId });
  } catch (error) {
    console.log("Error in create producto");
    res
      .status(500)
      .json({ message: "Error al crear producto", error: error.toString() });
  }
};

const updateById = async (req, res) => {
  console.log(`Updating product `, req.body);
  try {
    const id_producto = req.params.id;
    const dataProducto = req.body;
    const updatedRows = await CatalogoServices.updateById(
      id_producto,
      dataProducto
    );
    res
      .status(201)
      .json({ message: "Producto actualizado", updatedRows: updatedRows });
  } catch (error) {
    console.log("Error in update product");
    res.status(500).json({
      message: "Error al actualizar producto",
      error: error.toString(),
    });
  }
};

const deleteById = async (req, res) => {
  console.log(`Deleting product `, req.params.id);
  try {
    const id_producto = req.params.id;
    const updatedRows = await CatalogoServices.deleteById(id_producto);
    res.status(201).json({
      message: "Producto eliminado",
      updatedRows: updatedRows,
    });
  } catch (error) {
    console.log("Error in delete product");
    res.status(500).json({
      message: "Error al eliminar producto",
      error: error.toString(),
    });
  }
};

const uploadImage = async (req, res) => {
  try {
    await CatalogoServices.uploadImage(req, res);
  } catch (error) {
    console.log("Error in upload product image");
    res.status(500).json({
      message: "Error al actualizar imagen de producto",
      error: error.toString(),
    });
  }
};

const downloadImage = async (req, res) => {
  try {
    const id_producto = req.params.id;
    const fileUri = await CatalogoServices.downloadImage(id_producto);
    if (fs.existsSync(fileUri)) {
      res.download(fileUri, "imagen.jpg", (err) => {
        if (err) {
          throw err;
        }
      });
    } else {
      throw new Error("Archivo no encontrado");
    }
  } catch (error) {
    console.log("Error in download product image");
    res.status(500).json({
      message: "Error al descargar imagen de producto",
      error: error.toString(),
    });
  }
};

export const CatalogoController = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  uploadImage,
  downloadImage,
};

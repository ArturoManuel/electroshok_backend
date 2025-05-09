import { CategoriaServices } from "../services/categoria.services.js";

const getAll = async (req, res) => {
  console.log("Sending all categorias");
  try {
    const results = await CategoriaServices.getAll();
    res.json(results || []);
  } catch (error) {
    console.log("Error in get all categorias");
    res.status(500).json({
      message: "Error al obtener categorias",
      error: error.toString(),
    });
  }
};

const getById = async (req, res) => {
  console.log("Sending categoria with id: ", req.params.id);
  try {
    const id_categoria = req.params.id;
    const results = await CategoriaServices.getById(id_categoria);
    res.json(results[0] || {});
  } catch (error) {
    console.log("Error in get categoria by id");
    res.status(500).json({
      message: `Error al obtener categoria con id: ${req.params.id}`,
      error: error.toString(),
    });
  }
};

const create = async (req, res) => {
  console.log(`Creating user `, req.body);
  try {
    const dataCategoria = req.body;
    const createdId = await CategoriaServices.create(dataCategoria);
    res.status(201).json({ mensaje: "Categoria creada", id: createdId });
  } catch (error) {
    console.log("Error in create categoria ");
    res.status(500).json({
      message: `Error al crear categoria`,
      error: error.toString(),
    });
  }
};

const updateById = async (req, res) => {
  console.log(`Updating user ${req.params.id}`);
  try {
    const id_categoria = req.params.id;
    const dataCategoria = req.body;
    const updatedRows = await CategoriaServices.updateById(
      id_categoria,
      dataCategoria
    );
    res
      .status(201)
      .json({ mensaje: "Categoria actualizada", updatedRows: updatedRows });
  } catch (error) {
    console.log("Error in update categoria ");
    res.status(500).json({
      message: `Error al actualizar categoria`,
      error: error.toString(),
    });
  }
};

const deleteById = async (req, res) => {
  console.log(`Deleting user ${req.params.id}`);
  try {
    const id_categoria = req.params.id;
    const updatedRows = await CategoriaServices.deleteById(id_categoria);
    res
      .status(201)
      .json({ mensaje: "Categoria eliminada", updatedRows: updatedRows });
  } catch (error) {
    console.log("Error in delete categoria ");
    res.status(500).json({
      message: `Error al eliminar categoria`,
      error: error.toString(),
    });
  }
};

export const CategoriaController = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

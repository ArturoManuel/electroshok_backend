import { CarritoServices } from "../services/carrito.services.js";

const listByUser = async (req, res) => {
  console.log("Sending cart by user with id: ", req.params.id);
  try {
    const id_usuario = req.params.id;
    const results = await CarritoServices.listByUser(id_usuario);
    res.json(results || []);
  } catch (error) {
    console.log("Error in list carrito by user");
    res.status(500).json({
      message: "Error al obtener items del carrito",
      error: error.toString(),
    });
  }
};

const addItem = async (req, res) => {
  console.log("Adding item to cart", req.body);
  try {
    const dataItem = req.body;
    const id_item = await CarritoServices.addItem(dataItem);
    return id_item;
  } catch (error) {
    console.log("Error in add item to cart");
    res.status(500).json({
      message: "Error al agregar item al carrito",
      error: error.toString(),
    });
  }
};

const updateAmount = async (req, res) => {
  console.log("Updating item", req.body);
  try {
    const id_item = req.params.id;
    const dataItem = req.body;
    const updatedRows = await CarritoServices.updateAmount(id_item, dataItem);
    return updatedRows;
  } catch (error) {
    console.log("Error in update item amount");
    res.status(500).json({
      message: "Error al actualizar cantidad de item",
      error: error.toString(),
    });
  }
};

const deleteItem = async (req, res) => {
  console.log("Deleting item", req.params.id);
  try {
    const id_item = req.params.id;
    const updatedRows = await CarritoServices.deleteItem(id_item);
    return updatedRows;
  } catch (error) {
    console.log("Error in delete item from cart");
    res.status(500).json({
      message: "Error al eliminar items del carrito",
      error: error.toString(),
    });
  }
};

const deleteCart = async (req, res) => {
  console.log("Deleting cart from user ", req.params.id);
  try {
    const id_usuario = req.params.id;
    const updatedRows = await CarritoServices.deleteCart(id_usuario);
    return updatedRows;
  } catch (error) {
    console.log("Error in delete cart from user");
    res.status(500).json({
      message: "Error al eliminar carrito de usuario",
      error: error.toString(),
    });
  }
};

export const CarritoController = {
  listByUser,
  addItem,
  updateAmount,
  deleteItem,
  deleteCart,
};

import { CarritoServices } from "../services/carrito.services.js";

const listByUser = async (req, res) => {
  console.log("Sending cart by user with id: ", req.user.id_usuario);
  try {
    const id_usuario = req.user.id_usuario;
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
    const item = req.body;
    const id_usuario = req.user.id_usuario;
    const dataItem = {
      id_usuario: id_usuario,
      id_producto: item.id_producto,
      cantidad: item.cantidad,
    };
    const id_item = await CarritoServices.addItem(dataItem);
    res
      .status(201)
      .json({ message: "Agregado item al carrito", id_item: id_item });
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
    const item = req.body;
    const id_usuario = req.user.id_usuario;
    const dataItem = {
      id_usuario: id_usuario,
      id_producto: item.id_producto,
      cantidad: item.cantidad,
    };
    const updatedRows = await CarritoServices.updateAmount(id_item, dataItem);
    res.json({
      message: "Actualizado item del carrito",
      updatedRows: updatedRows,
    });
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
    res.json({
      message: "Eliminado item del carrito",
      updatedRows: updatedRows,
    });
  } catch (error) {
    console.log("Error in delete item from cart");
    res.status(500).json({
      message: "Error al eliminar items del carrito",
      error: error.toString(),
    });
  }
};

const deleteCart = async (req, res) => {
  console.log("Deleting cart from user ", req.user.id_usuario);
  try {
    const id_usuario = req.user.id_usuario;
    const wasDeleted = await CarritoServices.deleteCart(id_usuario);
    res.json({
      message: "Eliminado carrito del usuario",
      wasDeleted: wasDeleted,
    });
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

import { CarritoItemModel } from "../models/carritoitem.model.js";
import { DetallePedidoModel } from "../models/detallepedido.model.js";
import { PedidoModel } from "../models/pedido.model.js";

const getAll = async () => {
  try {
    const results = await PedidoModel.getAll();
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getById = async (id_pedido) => {
  try {
    const results = await PedidoModel.getById(id_pedido);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllByUserId = async (id_usuario) => {
  try {
    const results = await PedidoModel.getAllByUserId(id_usuario);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDetails = async (id_pedido) => {
  try {
    const details = await DetallePedidoModel.getDetails(id_pedido);
    return details;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async (id_usuario) => {
  try {
    const carrito = await CarritoItemModel.listByUser(id_usuario);
    if (carrito.length === 0) {
      throw new Error("No se puede crear el pedido: El carrito esta vacio");
    }
    const total = carrito.reduce(
      (acc, item) => acc + item.producto.precio * item.cantidad,
      0
    );
    const id_pedido = await PedidoModel.create(id_usuario, total);
    const details = await DetallePedidoModel.createInBulk(id_pedido, carrito);
    if (details.length === 0) {
      throw new Error("Error al crear detalle pedido");
    }
    const deletedCart = await CarritoItemModel.deleteCart(id_usuario);
    if (!deletedCart) {
      throw new Error("Error al vaciar carrito");
    }
    return id_pedido;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateState = async (id_pedido, newState) => {
  try {
    const updatedRows = await PedidoModel.updateState(id_pedido, newState);
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const PedidoServices = {
  create,
  getAll,
  getDetails,
  getById,
  updateState,
  getAllByUserId,
};

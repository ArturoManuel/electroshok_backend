import { PedidoServices } from "../services/pedido.services.js";

const getAll = async (req, res) => {
  console.log(`Sending all orders`);
  try {
    const results = await PedidoServices.getAll();
    res.json(results || []);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener pedidos",
      error: error.toString(),
    });
  }
};

const getById = async (req, res) => {
  console.log(`Sending order by id `, req.params.id);
  try {
    const id_pedido = req.params.id;
    const results = await PedidoServices.getById(id_pedido);
    res.json(results[0] || {});
  } catch (error) {
    res.status(500).json({
      message: `Error al obtener pedido con id: ${req.params.id}`,
      error: error.toString(),
    });
  }
};

const getAllByUserId = async (req, res) => {
  console.log(`Sending orders by user id `, req.user.id_usuario);
  try {
    const id_usuario = req.user.id_usuario;
    const results = await PedidoServices.getAllByUserId(id_usuario);
    res.json(results || []);
  } catch (error) {
    res.status(500).json({
      message: `Error al obtener pedidos del usuario con id: ${req.params.id}`,
      error: error.toString(),
    });
  }
};

const create = async (req, res) => {
  console.log(`Creating order of user with id: `, req.user.id_usuario);
  try {
    const id_usuario = req.user.id_usuario;
    const id_pedido = await PedidoServices.create(id_usuario);
    res.status(201).json({ message: "Pedido creado", id_pedido: id_pedido });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear pedido", error: error.toString() });
  }
};

const updateState = async (req, res) => {
  console.log(`Updating order state `, req.params.id);
  try {
    const id_pedido = req.params.id;
    const { newState } = req.body;
    const updatedRows = await PedidoServices.updateState(id_pedido, newState);
    res.json({ message: "Pedido actualizado", updatedRows: updatedRows });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar pedido",
      error: error.toString(),
    });
  }
};

const getDetails = async (req, res) => {
  console.log(`Sending order details by id `, req.params.id);
  try {
    const id_pedido = req.params.id;
    const details = await PedidoServices.getDetails(id_pedido);
    res.json(details || []);
  } catch (error) {
    res.status(500).json({
      message: `Error al obtener detalles de pedido con id: ${req.params.id}`,
      error: error.toString(),
    });
  }
};

export const PedidoController = {
  create,
  getAll,
  getDetails,
  getById,
  updateState,
  getAllByUserId,
};

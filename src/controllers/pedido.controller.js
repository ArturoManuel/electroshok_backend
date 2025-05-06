import * as PedidoServices from "../services/pedido.services.js";

export const getAll = (req, res) => {
  console.log(`Sending all orders`);
  PedidoServices.getAll()
    .then((results) => {
      res.json(results || []);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al obtener pedidos",
        error: error.toString(),
      });
    });
};

export const getById = (req, res) => {
  console.log(`Sending order by id `, req.params.id);
  PedidoServices.getById(req.params.id)
    .then((results) => {
      res.json(results[0] || {});
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error al obtener pedido con id: ${req.params.id}`,
        error: error.toString(),
      });
    });
};

export const create = (req, res) => {
  console.log(`Creating order `, req.body);
  const id_usuario = req.body.id_usuario;
  const items = req.body.items;
  PedidoServices.create(id_usuario, items)
    .then((resultado) => {
      res.status(201).json({ mensaje: "Pedido creado" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error al crear pedido", error: error.toString() });
    });
};

export const updateById = (req, res) => {
  console.log(`Updating order `, req.params.id);
  const id_pedido = req.params.id;
  const items = req.body;
  PedidoServices.updateById(id_pedido, items)
    .then((resultado) => {
      res.json({ mensaje: "Pedido actualizado" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al actualizar pedido",
        error: error.toString(),
      });
    });
};

export const deleteById = (req, res) => {
  console.log(`Deleting order `, req.params.id);
  const id_pedido = req.params.id;
  PedidoServices.deleteById(id_pedido)
    .then((resultado) => {
      res.json({ mensaje: "Pedido eliminado" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error al eliminar pedido", error: error.toString() });
    });
};

export const getDetails = (req, res) => {
  console.log(`Sending order details by id `, req.params.id);
  PedidoServices.getDetails(req.params.id)
    .then((results) => {
      res.json(results[0] || {});
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error al obtener detalles de pedido con id: ${req.params.id}`,
        error: error.toString(),
      });
    });
};

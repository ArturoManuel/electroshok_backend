import express from "express";
import * as PedidoController from "../controllers/pedido.controller.js";

const router = express.Router();

router.get("/", PedidoController.getAll);
router.get("/:id", PedidoController.getById);
router.get("/:id/detail", PedidoController.getDetails);
router.post("/", PedidoController.create);
router.put("/:id", PedidoController.updateById);
router.delete("/:id", PedidoController.deleteById);

export default router;

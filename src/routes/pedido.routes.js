import express from "express";
import { PedidoController } from "../controllers/pedido.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware(["administrador"]), PedidoController.getAll);
router.post("/", authMiddleware(), PedidoController.create);

router.get("/user/", authMiddleware(), PedidoController.getAllByUserId);

router.get("/:id", authMiddleware(), PedidoController.getById);
router.get("/:id/detail", authMiddleware(), PedidoController.getDetails);
router.put("/:id", authMiddleware(), PedidoController.updateState);

export default router;

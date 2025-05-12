import express from "express";
import { CarritoController } from "../controllers/carrito.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware(), CarritoController.listByUser);
router.post("/", authMiddleware(), CarritoController.addItem);
router.delete("/", authMiddleware(), CarritoController.deleteCart);

router.delete("/:id", authMiddleware(), CarritoController.deleteItem);
router.put("/:id", authMiddleware(), CarritoController.updateAmount);

export default router;

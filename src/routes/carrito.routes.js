import express from "express";
import { CarritoController } from "../controllers/carrito.controller.js";

const router = express.Router();

router.get("/user/:id", CarritoController.listByUser);

router.post("/", CarritoController.addItem);
router.delete("/:id", CarritoController.deleteItem);
router.put("/:id", CarritoController.updateAmount);

router.delete("/user", CarritoController.deleteCart);

export default router;

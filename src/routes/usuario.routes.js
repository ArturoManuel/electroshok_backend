import express from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", UsuarioController.getAll);
router.post("/", authMiddleware(), UsuarioController.create);

router.get("/:id", UsuarioController.getById);
router.put("/:id", authMiddleware(), UsuarioController.updateById);
router.delete("/:id", authMiddleware(), UsuarioController.deleteById);

export default router;

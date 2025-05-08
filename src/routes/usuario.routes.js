import express from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";

const router = express.Router();

router.get("/", UsuarioController.getAll);
router.get("/:id", UsuarioController.getById);
router.post("/", UsuarioController.create);
router.put("/:id", UsuarioController.updateById);
router.delete("/:id", UsuarioController.deleteById);

export default router;

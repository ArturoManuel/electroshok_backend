import express from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware(["administrador"]), UsuarioController.getAll);
router.post("/", UsuarioController.create);

router.get(
  "/:id",
  authMiddleware(["administrador"]),
  UsuarioController.getById
);
router.put(
  "/:id",
  authMiddleware(["administrador"]),
  UsuarioController.updateById
);
router.delete(
  "/:id",
  authMiddleware(["administrador"]),
  UsuarioController.deleteById
);

export default router;

import express from "express";
import { CategoriaController } from "../controllers/categoria.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", CategoriaController.getAll);
router.post("/", authMiddleware(["administrador"]), CategoriaController.create);

router.get("/:id", CategoriaController.getById);
router.put(
  "/:id",
  authMiddleware(["administrador"]),
  CategoriaController.updateById
);
router.delete(
  "/:id",
  authMiddleware(["administrador"]),
  CategoriaController.deleteById
);

export default router;

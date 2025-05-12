import express from "express";
import { CategoriaController } from "../controllers/categoria.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", CategoriaController.getAll);
router.post("/", authMiddleware(), CategoriaController.create);

router.get("/:id", CategoriaController.getById);
router.put("/:id", authMiddleware(), CategoriaController.updateById);
router.delete("/:id", authMiddleware(), CategoriaController.deleteById);

export default router;

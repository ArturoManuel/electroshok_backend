import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { CatalogoController } from "../controllers/catalogo.controller.js";

const router = express.Router();

router.get("/", CatalogoController.getAll);
router.get("/:id", CatalogoController.getById);
router.post("/", authMiddleware(), CatalogoController.create);
router.put(
  "/:id",
  // MiddlewareAuth.authMiddleware(["admin"]),
  authMiddleware(),
  CatalogoController.updateById
);
router.delete("/:id", authMiddleware(), CatalogoController.deleteById);

export default router;

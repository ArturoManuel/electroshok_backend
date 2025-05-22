import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { CatalogoController } from "../controllers/catalogo.controller.js";

const router = express.Router();

router.get("/", CatalogoController.getAll);
router.post("/", authMiddleware(), CatalogoController.create);

router.post(
  "/uploadImage",
  authMiddleware(["administrador"]),
  CatalogoController.uploadImage
);
router.get(
  "/downloadImage/:id",
  authMiddleware(),
  CatalogoController.downloadImage
);

router.get("/:id", CatalogoController.getById);
router.put("/:id", authMiddleware(), CatalogoController.updateById);
router.delete("/:id", authMiddleware(), CatalogoController.deleteById);

export default router;

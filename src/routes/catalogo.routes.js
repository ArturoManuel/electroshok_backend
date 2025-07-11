import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { CatalogoController } from "../controllers/catalogo.controller.js";

const router = express.Router();

router.get("/", CatalogoController.getAll);
router.post("/", authMiddleware(["administrador"]), CatalogoController.create);

router.post(
  "/uploadImage",
  authMiddleware(["administrador"]),
  CatalogoController.uploadImage
);
router.get("/downloadImage/:id", CatalogoController.downloadImage);

router.get("/:id", CatalogoController.getById);
router.put(
  "/:id",
  authMiddleware(["administrador"]),
  CatalogoController.updateById
);
router.delete(
  "/:id",
  authMiddleware(["administrador"]),
  CatalogoController.deleteById
);

export default router;

import express from "express";
import * as CatalogoController from "../controllers/catalogo.controller.js";
import * as MiddlewareAuth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", CatalogoController.getAll);
router.get("/:id", CatalogoController.getWithId);
router.post("/", MiddlewareAuth.authMiddleware(), CatalogoController.create);
router.put(
  "/:id",
  MiddlewareAuth.authMiddleware(["admin"]),
  CatalogoController.updateById
);
router.delete(
  "/:id",
  MiddlewareAuth.authMiddleware(),
  CatalogoController.deleteById
);

export default router;

import express from "express";
import * as SeguridadController from "../controllers/seguridad.controller.js";

const router = express.Router();

router.post("/login", SeguridadController.login);
router.post("/block", SeguridadController.blockUser);
router.post("/unblock", SeguridadController.unblockUser);

export default router;

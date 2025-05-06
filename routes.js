import express from "express";
import catalogoRoutes from "./src/routes/catalogo.routes.js";
import pedidoRoutes from "./src/routes/pedido.routes.js";
import usuarioRoutes from "./src/routes/usuario.routes.js";
import seguridadRoutes from "./src/routes/seguridad.routes.js";

const router = express.Router();

router.use("/catalogo", catalogoRoutes);
router.use("/pedido", pedidoRoutes);
router.use("/usuario", usuarioRoutes);
router.use("/seguridad", seguridadRoutes);

export default router;

import _express from "express";
import rseguridad from "./routes/seguridad.routes.js"
import rcatalogo from "./routes/catalogo.routes.js"
import rfile from "./routes/file.routes.js";

const router= _express.Router();

//... secciones ...
router.use('/seguridad', rseguridad);
router.use('/catalogo', rcatalogo);
router.use('/archivos', rfile);

export default router;

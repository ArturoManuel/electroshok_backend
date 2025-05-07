import _express from "express";
import * as ccatalogo from "../controllers/catalogo.controller.js"
import * as mauth from "../middleware/auth.middleware.js"
const router= _express.Router();

router.get('/', ccatalogo.getAll);

router.get('/:id', ccatalogo.getById);

router.post('/', mauth.authMiddleware(), ccatalogo.create);

router.put('/:id', mauth.authMiddleware(["admin"]), ccatalogo.update);

router.patch('/:id', mauth.authMiddleware(), ccatalogo.update);

router.delete('/:id', mauth.authMiddleware(), ccatalogo.deletes);

router.post('/reporte', ccatalogo.getReporte);

export default router;

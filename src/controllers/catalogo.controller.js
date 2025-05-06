import * as CatalogoServices from "../services/catalogo.services.js";

export const getAll = (req, res) => {
  console.log(`Sending all products`);
  CatalogoServices.getAll()
    .then((results) => {
      res.json(results || []);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al obtener productos",
        error: error.toString(),
      });
    });
};

export const getWithId = (req, res) => {
  console.log(`Sending product by id `, req.params.id);
  CatalogoServices.getById(req.params.id)
    .then((results) => {
      res.json(results[0] || {});
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error al obtener producto con id: ${req.params.id}`,
        error: error.toString(),
      });
    });
};

export const create = (req, res) => {
  console.log(`Creating product `, req.body);
  CatalogoServices.create(req.body)
    .then((resultado) => {
      res
        .status(201)
        .json({ mensaje: "Producto creado", id_insertado: resultado.insertId });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error al crear producto", error: error.toString() });
    });
};
export const updateById = (req, res) => {
  console.log(`Updating product `, req.body);
  CatalogoServices.updateById(req.params.id, req.body)
    .then((results) => {
      res.json({ mensaje: "Producto actualizado" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al actualizar producto",
        error: error.toString(),
      });
    });
};
export const deleteById = (req, res) => {
  console.log(`Deleting product `, req.params.id);
  CatalogoServices.deleteById(req.params.id)
    .then((results) => {
      res.json({ mensaje: "Producto eliminado" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error al actualizar producto",
        error: error.toString(),
      });
    });
};

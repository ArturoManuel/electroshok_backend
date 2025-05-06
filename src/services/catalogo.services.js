import pool from "../config/db.js";

export const getAll = () => {
  const query = `SELECT * FROM Producto`;

  return new Promise((resolve, reject) => {
    pool.query(query, (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const getById = (id_producto) => {
  const query = `SELECT * FROM Producto WHERE id_producto = ?`;

  return new Promise((resolve, reject) => {
    pool.query(query, [id_producto], (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const create = (producto) => {
  const query = `
      INSERT INTO Producto (nombre, descripcion, precio, stock, url_imagen, id_categoria)
      VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    producto.nombre,
    producto.descripcion,
    producto.precio,
    producto.stock,
    producto.url_imagen,
    producto.id_categoria,
  ];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const updateById = (id_producto, producto) => {
  const query = `
  UPDATE Producto
  SET nombre = ?, descripcion = ?, precio = ?, stock = ?, url_imagen = ?, id_categoria = ?, esta_activo = ?
  WHERE id_producto = ?
`;
  const values = [
    producto.nombre,
    producto.descripcion,
    producto.precio,
    producto.stock,
    producto.url_imagen,
    producto.id_categoria,
    producto.esta_activo,
    id_producto,
  ];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const deleteById = (id_producto) => {
  const query = `UPDATE Producto SET esta_activo=0 WHERE id_producto=?`;

  return new Promise((resolve, reject) => {
    pool.query(query, [id_producto], (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

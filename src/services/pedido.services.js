import pool from "../config/db.js";

export const getAll = () => {
  const query = `
            SELECT id_pedido, fecha_pedido, id_usuario, total, estado, fecha_creacion
            FROM Pedido
            ORDER BY fecha_pedido DESC`;

  return new Promise((resolve, reject) => {
    pool.query(query, (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const getById = (id_pedido) => {
  const query = `
            SELECT id_pedido, fecha_pedido, total, estado
            FROM Pedido
            WHERE id_pedido = ?`;

  return new Promise((resolve, reject) => {
    pool.query(query, [id_pedido], (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const getDetails = (id_pedido) => {
  const query = `
            SELECT dp.id_detalle, p.nombre, dp.cantidad, dp.precio_unitario,
                   (dp.cantidad * dp.precio_unitario) AS subtotal
            FROM DetallePedido dp
            JOIN Producto p ON dp.id_producto = p.id_producto
            WHERE dp.id_pedido = ?`;

  return new Promise((resolve, reject) => {
    pool.query(query, [id_pedido], (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const create = (id_usuario, items) => {
  const queryPedido = `
      INSERT INTO Pedido (id_usuario, total) VALUES (?, ?)
  `;
  const queryDetalles = `
      INSERT INTO DetallePedido (id_pedido, id_producto, cantidad, precio_unitario)
      VALUES ?
  `;
  const total = items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  const valuesPedido = [id_usuario, total];

  return new Promise((resolve, reject) => {
    pool.query(queryPedido, valuesPedido, (error, resultsPedido, fields) => {
      if (error) reject(error);
      else {
        const idPedido = resultsPedido.insertId;

        const valuesDetalles = items.map((item) => [
          idPedido,
          item.id_producto,
          item.cantidad,
          item.precio,
        ]);

        pool.query(
          queryDetalles,
          valuesDetalles,
          (err, resultsDetails, fields) => {
            if (err) reject(error);
            else resolve(resultsDetails);
          }
        );
      }
    });
  });
};

export const updateById = (id_pedido, items) => {
  const queryPedido = `
      UPDATE Pedido SET total=? WHERE id_pedido=?
  `;
  const queryDetallesDelete = `
      DELETE FROM DetallePedido WHERE id_pedido=?
  `;
  const queryDetallesInsert = `
      INSERT INTO DetallePedido (id_pedido, id_producto, cantidad, precio_unitario)
      VALUES ?
  `;
  const total = items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  const valuesPedido = [total, id_pedido];

  return new Promise((resolve, reject) => {
    pool.query(queryPedido, valuesPedido, (error, resultsPedido, fields) => {
      if (error) reject(error);
      else {
        pool.query(
          queryDetallesDelete,
          [id_pedido],
          (error, results, fields) => {
            if (error) reject(error);
            else {
              const valuesDetalles = items.map((item) => [
                idPedido,
                item.id_producto,
                item.cantidad,
                item.precio,
              ]);
              pool.query(
                queryDetallesInsert,
                valuesDetalles,
                (err, resultsDetailsInsert, fields) => {
                  if (err) reject(error);
                  else resolve(resultsDetailsInsert);
                }
              );
            }
          }
        );
      }
    });
  });
};

export const deleteById = (id_pedido) => {
  const query = `UPDATE Pedido SET estado='cancelado' WHERE id_pedido=?`;

  return new Promise((resolve, reject) => {
    pool.query(query, [id_pedido], (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

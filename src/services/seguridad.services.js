import pool from "../config/db.js";

export const getUsuarioByCorreo = (credenciales) => {
  // Para el login
  const query = `SELECT * FROM Usuario WHERE correo_electronico = ?`;

  return new Promise((resolve, reject) => {
    pool.query(
      query,
      [credenciales.correo_electronico],
      (error, results, fields) => {
        if (error) reject(error);
        else resolve(results);
      }
    );
  });
};

export const block = (id_usuario) => {
  // Es igual que el servicio de delete usuario
  const query = `UPDATE Usuario SET esta_activo=0 WHERE id_usuario=?`;

  return new Promise((resolve, reject) => {
    pool.query(query, [id_usuario], (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const unblock = (id_usuario) => {
  const query = `UPDATE Usuario SET esta_activo=1 WHERE id_usuario=?`;

  return new Promise((resolve, reject) => {
    pool.query(query, [id_usuario], (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const updateIntentos = (id_usuario) => {
  const query = `UPDATE Usuario SET intentos=intentos+1 WHERE id_usuario=?`;

  return new Promise((resolve, reject) => {
    pool.query(query, [id_usuario], (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

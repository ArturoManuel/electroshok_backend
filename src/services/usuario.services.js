import bcrypt from "bcrypt";
import pool from "../config/db.js";

export const getAll = () => {
  const query = `SELECT * FROM Usuario`;

  return new Promise((resolve, reject) => {
    pool.query(query, (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const getById = (id_usuario) => {
  const query = `SELECT * FROM Usuario WHERE id_usuario = ?`;

  return new Promise((resolve, reject) => {
    pool.query(query, [id_usuario], (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const create = async (usuario) => {
  const query = `
          INSERT INTO Usuario (nombre, correo_electronico, contrasena, rol)
          VALUES (?, ?, ?, ?)`;
  const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
  const values = [
    usuario.nombre,
    usuario.correo_electronico,
    hashedPassword,
    usuario.rol || "cliente",
  ];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const updateById = async (id_usuario, usuario) => {
  const query = `
  UPDATE Usuario
  SET nombre = ?, correo_electronico = ?, contrasena=?, rol=?
  WHERE id_usuario = ?
`;
  const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
  const values = [
    usuario.nombre,
    usuario.correo_electronico,
    hashedPassword,
    usuario.rol || "cliente",
    id_usuario,
  ];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export const deleteById = (id_usuario) => {
  // Es igual que el servicio de bloquear usuario
  const query = `UPDATE Usuario SET esta_activo=0 WHERE id_usuario=?`;

  return new Promise((resolve, reject) => {
    pool.query(query, [id_usuario], (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

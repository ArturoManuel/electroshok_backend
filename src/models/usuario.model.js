import { DataTypes, Sequelize } from "sequelize";
import orm from "../config/sequelize.js";

export const Usuario = orm.define(
  "usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [1,50]
      // }
    },
    correo_electronico: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 100],
        isEmail: true,
      },
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [5, 20],
      // },
    },
    rol: {
      type: DataTypes.ENUM,
      values: ["cliente", "administrador"],
      defaultValue: "cliente",
    },
    fecha_creacion: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    esta_activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    intentos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    tableName: "usuario",
    timestamps: false,
  }
);

export const connect = async function () {
  await orm.authenticate();
  console.log("conexion establecida: usuario");
};

const login = async (credenciales) => {
  const results = await Usuario.findAll({
    where: {
      esta_activo: true,
      correo_electronico: credenciales.correo_electronico,
    },
  });
  return results.map((u) => u.toJSON());
};

const findAll = async () => {
  const results = await Usuario.findAll({
    where: {
      esta_activo: true,
    },
  });
  return results.map((u) => u.toJSON());
};

const findById = async (id_usuario) => {
  const results = await Usuario.findAll({
    where: {
      esta_activo: true,
      id_usuario: id_usuario,
    },
  });
  return results.map((u) => u.toJSON());
};

const create = async (dataUsuario) => {
  try {
    const usuario = await Usuario.create({
      nombre: dataUsuario.nombre,
      correo_electronico: dataUsuario.correo_electronico,
      contrasena: dataUsuario.contrasena,
      rol: dataUsuario.rol,
    });
    console.log("Usuario creado: ", usuario);
    return usuario.id_usuario;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateById = async (id_usuario, dataUsuario) => {
  try {
    const [updatedRows] = await Usuario.update(
      {
        nombre: dataUsuario.nombre,
        correo_electronico: dataUsuario.correo_electronico,
        contrasena: dataUsuario.contrasena,
        rol: dataUsuario.rol,
      },
      {
        where: {
          id_usuario: id_usuario,
        },
      }
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const block = async (id_usuario) => {
  try {
    const [updatedRows] = await Usuario.update(
      {
        esta_activo: false,
      },
      {
        where: {
          id_usuario: id_usuario,
        },
      }
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const unblock = async (id_usuario) => {
  try {
    const [updatedRows] = await Usuario.update(
      {
        esta_activo: true,
        intentos: 0,
      },
      {
        where: {
          id_usuario: id_usuario,
        },
      }
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateIntentos = async (id_usuario, numIntentos) => {
  try {
    const [updatedRows] = await Usuario.update(
      {
        intentos: numIntentos,
      },
      {
        where: {
          id_usuario: id_usuario,
        },
      }
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UsuarioModel = {
  login,
  findAll,
  findById,
  block, //this is delete by id
  unblock,
  updateIntentos,
  create,
  updateById,
};

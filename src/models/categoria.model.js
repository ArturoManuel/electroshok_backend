import { DataTypes, Sequelize } from "sequelize";
import orm from "../config/sequelize.js";

export const Categoria = orm.define(
  "categoria",
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_categoria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_creacion: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    esta_activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "categoria",
    timestamps: false,
  }
);

export const connect = async function () {
  await orm.authenticate();
  console.log("conexion establecida: usuario");
};

const findAll = async () => {
  try {
    const results = await Categoria.findAll({
      where: {
        esta_activo: true,
      },
    });
    return results.map((u) => u.toJSON());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findById = async (id_categoria) => {
  try {
    const results = await Categoria.findAll({
      where: {
        esta_activo: true,
        id_categoria: id_categoria,
      },
    });
    return results.map((u) => u.toJSON());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async (dataCategoria) => {
  try {
    const categoria = await Categoria.create({
      nombre_categoria: dataCategoria.nombre_categoria,
      tipo_categoria: dataCategoria.tipo_categoria,
    });
    console.log("Categoria creada: ", categoria);
    return categoria.id_categoria;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateById = async (id_categoria, dataCategoria) => {
  try {
    const [updatedRows] = await Categoria.update(
      {
        nombre_categoria: dataCategoria.nombre_categoria,
        tipo_categoria: dataCategoria.tipo_categoria,
      },
      {
        where: {
          id_categoria: id_categoria,
        },
      }
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteById = async (id_categoria) => {
  try {
    const [updatedRows] = await Categoria.update(
      {
        esta_activo: false,
      },
      {
        where: {
          id_categoria: id_categoria,
        },
      }
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CategoriaModel = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};

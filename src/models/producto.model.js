import { DataTypes, Sequelize } from "sequelize";
import orm from "../config/sequelize.js";
import { Categoria } from "./categoria.model.js";

export const Producto = orm.define(
  "producto",
  {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url_imagen: {
      type: DataTypes.STRING,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categoria,
        key: "id_categoria",
      },
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
    tableName: "producto",
    timestamps: false,
  }
);

Categoria.hasMany(Producto, { foreignKey: "id_categoria" });
Producto.belongsTo(Categoria, { foreignKey: "id_categoria" });

export const connect = async function () {
  await orm.authenticate();
  console.log("conexion establecida: producto");
};

const getAll = async () => {
  try {
    const results = await Producto.findAll({
      include: [Categoria],
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

const getById = async (id_producto) => {
  try {
    const results = await Producto.findAll({
      include: [Categoria],
      where: {
        esta_activo: true,
        id_producto: id_producto,
      },
    });
    return results.map((u) => u.toJSON());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const create = async (dataProducto) => {
  try {
    const producto = await Producto.create({
      nombre: dataProducto.nombre,
      descripcion: dataProducto.descripcion,
      precio: dataProducto.precio,
      stock: dataProducto.stock,
      url_imagen: dataProducto.url_imagen,
      id_categoria: dataProducto.id_categoria,
    });
    console.log("Producto creado: ", producto);
    return producto.toJSON().id_producto;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateById = async (id_producto, dataProducto) => {
  try {
    const [updatedRows] = await Producto.update(
      {
        nombre: dataProducto.nombre,
        descripcion: dataProducto.descripcion,
        precio: dataProducto.precio,
        stock: dataProducto.stock,
        url_imagen: dataProducto.url_imagen,
        id_categoria: dataProducto.id_categoria,
      },
      {
        where: {
          id_producto: id_producto,
        },
      }
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteById = async (id_producto) => {
  try {
    const [updatedRows] = await Producto.update(
      {
        esta_activo: false,
      },
      {
        where: {
          id_producto: id_producto,
        },
      }
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ProductoModel = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

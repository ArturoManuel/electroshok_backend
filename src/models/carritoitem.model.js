import { DataTypes, Sequelize } from "sequelize";
import orm from "../config/sequelize.js";
import { Usuario } from "./usuario.model.js";
import { Producto } from "./producto.model.js";

export const CarritoItem = orm.define(
  "carritoitem",
  {
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id_usuario",
      },
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Producto,
        key: "id_producto",
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "carritoitem",
    timestamps: false,
  }
);

Usuario.hasMany(CarritoItem, { foreignKey: "id_usuario" });
CarritoItem.belongsTo(Usuario, { foreignKey: "id_usuario" });

Producto.hasMany(CarritoItem, { foreignKey: "id_producto" });
CarritoItem.belongsTo(Producto, { foreignKey: "id_producto" });

export const connect = async function () {
  await orm.authenticate();
  console.log("conexion establecida: carrito");
};

const listByUser = async (id_usuario) => {
  try {
    const results = await CarritoItem.findAll({
      include: [Producto, Usuario],
      where: {
        id_usuario: id_usuario,
      },
    });
    return results.map((u) => u.toJSON());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addItem = async (dataItem) => {
  try {
    const item = await CarritoItem.create({
      id_usuario: dataItem.id_usuario,
      id_producto: dataItem.id_producto,
      cantidad: dataItem.cantidad,
    });
    console.log("Item creado: ", item);
    return item.toJSON().id_item;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateAmount = async (id_item, dataItem) => {
  try {
    const [updatedRows] = await CarritoItem.update(
      {
        cantidad: dataItem.cantidad,
      },
      {
        where: {
          id_item: id_item,
        },
      }
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteItem = async (id_item) => {
  try {
    await CarritoItem.destroy({
      where: {
        id_item: id_item,
      },
    });
    const updatedRows = 1; //Asumiendo que no hubo errores (Sequelize.destroy no devuelve el numero de updated rows)
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteCart = async (id_usuario) => {
  try {
    await CarritoItem.destroy({
      where: {
        id_usuario: id_usuario,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CarritoItemModel = {
  listByUser,
  addItem,
  updateAmount,
  deleteItem,
  deleteCart,
};

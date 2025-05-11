import { DataTypes, Sequelize } from "sequelize";
import orm from "../config/sequelize.js";
import { Pedido } from "./pedido.model.js";
import { Producto } from "./producto.model.js";

export const DetallePedido = orm.define(
  "detallepedido",
  {
    id_detalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pedido,
        key: "id_pedido",
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
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "detallepedido",
    timestamps: false,
  }
);

Pedido.hasMany(DetallePedido, { foreignKey: "id_pedido" });
DetallePedido.belongsTo(Pedido, { foreignKey: "id_pedido" });

Producto.hasMany(DetallePedido, { foreignKey: "id_producto" });
DetallePedido.belongsTo(Producto, { foreignKey: "id_producto" });

export const connect = async function () {
  await orm.authenticate();
  console.log("conexion establecida: detalle pedido");
};

const createInBulk = async (id_pedido, dataDetalles) => {
  try {
    const details = await DetallePedido.bulkCreate(
      dataDetalles.map((item) => ({
        id_pedido: id_pedido,
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        precio_unitario: item.producto.precio,
      }))
    );
    console.log(details);
    return details.map((i) => i.toJSON());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDetails = async (id_pedido) => {
  try {
    const results = await DetallePedido.findAll({
      include: [Producto],
      where: {
        id_pedido: id_pedido,
      },
    });
    return results.map((i) => i.toJSON());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DetallePedidoModel = {
  createInBulk,
  getDetails,
};

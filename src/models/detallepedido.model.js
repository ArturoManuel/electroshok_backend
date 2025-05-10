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

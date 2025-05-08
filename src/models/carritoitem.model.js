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
  console.log("conexion establecida: usuario");
};

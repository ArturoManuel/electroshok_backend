import { DataTypes, Sequelize } from "sequelize";
import orm from "../config/sequelize.js";
import { Usuario } from "./usuario.model.js";

export const Pedido = orm.define(
  "pedido",
  {
    id_pedido: {
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
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "pagado", "cancelado"),
      defaultValue: "pendiente",
    },
    fecha_pedido: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    fecha_creacion: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
    tableName: "pedido",
    timestamps: false,
  }
);

Usuario.hasMany(Pedido, { foreignKey: "id_usuario" });
Pedido.belongsTo(Usuario, { foreignKey: "id_usuario" });

export const connect = async function () {
  await orm.authenticate();
  console.log("conexion establecida: usuario");
};

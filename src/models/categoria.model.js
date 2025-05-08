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

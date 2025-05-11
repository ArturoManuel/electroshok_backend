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
  console.log("conexion establecida: pedido");
};

const create = async (id_usuario, total) => {
  try {
    const pedido = await Pedido.create({
      id_usuario: id_usuario,
      total: total,
    });
    const id_pedido = pedido.toJSON().id_pedido;
    return id_pedido;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAll = async () => {
  try {
    const results = await Pedido.findAll({
      order: ["fecha_pedido"],
    });
    return results.map((i) => i.toJSON());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDetails = async (id_pedido) => {
  try {
    const details = await DetallePedidoModel.getDetails(id_pedido);
    return details;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getById = async (id_pedido) => {
  try {
    const results = await Pedido.findAll({
      order: ["fecha_pedido"],
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

const updateState = async (id_pedido, newState) => {
  try {
    const [updatedRows] = await Pedido.update(
      {
        estado: newState,
      },
      {
        where: {
          id_pedido: id_pedido,
        },
      }
    );
    return updatedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllByUserId = async (id_usuario) => {
  try {
    const results = await Pedido.findAll({
      order: ["fecha_pedido"],
      where: {
        id_usuario: id_usuario,
      },
    });
    return results.map((i) => i.toJSON());
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const PedidoModel = {
  create,
  getAll,
  getDetails,
  getById,
  updateState,
  getAllByUserId,
};

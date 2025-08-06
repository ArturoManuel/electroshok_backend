import { Sequelize } from "sequelize";
import {
  DATABASE_CONNECTION_LIMIT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
} from "../utils/constants.js";

// Configuración de la conexión
const orm = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: "mysql",
  pool: {
    max: DATABASE_CONNECTION_LIMIT,
    idle: 10000,
    acquire: 60000,
  },
});

export default orm;

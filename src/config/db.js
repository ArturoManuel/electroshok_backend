import _mysql from "mysql2";
import {
  DATABASE_CONNECTION_LIMIT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_QUEUE_LIMIT,
  DATABASE_USER,
} from "../utils/constants";

const pool = _mysql.createPool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: DATABASE_CONNECTION_LIMIT,
  queueLimit: DATABASE_QUEUE_LIMIT,
});

export default pool;

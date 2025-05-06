import _mysql from "mysql2";

const pool = _mysql.createPool({
  host: "localhost",
  user: "root",
  password: "paltita99sql",
  database: "electroshok",
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0,
});

export default pool;

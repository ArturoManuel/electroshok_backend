export const JWT_SECRET = process.env.JWT_SECRET || "secretillo";
export const JWT_EXPIRES = "1h";

export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "secretillo2";
export const JWT_REFRESH_EXPIRES = "1d";

export const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
export const DATABASE_USER = process.env.DATABASE_USER || "root";
export const DATABASE_PASSWORD =
  process.env.DATABASE_PASSWORD || "";
export const DATABASE_NAME = process.env.DATABASE_NAME || "electroshok";
export const DATABASE_CONNECTION_LIMIT =
  parseInt(process.env.DATABASE_CONNECTION_LIMIT || "2", 10);
export const DATABASE_QUEUE_LIMIT = parseInt(process.env.DATABASE_QUEUE_LIMIT || "0", 10);

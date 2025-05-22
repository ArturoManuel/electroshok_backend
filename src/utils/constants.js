export const JWT_SECRET = process.env.JWT_SECRET || "secretillo";
export const JWT_EXPIRES = "1h";

export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "secretillo2";
export const JWT_REFRESH_EXPIRES = "1d";

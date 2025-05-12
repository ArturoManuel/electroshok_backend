import path from "path";

export const getArchivo = function (filename) {
  try {
    const rutaArchivo = path.join("./src/uploads", filename);
    console.log(rutaArchivo);
    return rutaArchivo;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

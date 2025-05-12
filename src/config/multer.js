import _multer from "multer";
import { ProductoModel } from "../models/producto.model.js";

const storage = _multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + getExtension(file.originalname)
    );
  },
});

const getExtension = (filename) => {
  return filename.substring(filename.lastIndexOf("."));
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo invalido"), false);
  }
};

export const uploadProductImage = async function (req, res) {
  const uploadFile = _multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
  uploadFile.single("archivo")(req, res, async (err) => {
    if (!err) {
      console.log(req.file);
      console.log(req.body.id_producto);
      if (!req.file) {
        return res
          .status(400)
          .json({ error: "No se encontro imagen a cargar" });
      }
      if (
        (await ProductoModel.updateImage(
          req.body.id_producto,
          req.file.filename
        )) > 0
      ) {
        res.json({ message: "Imagen cargada: ", file: req.file.filename });
      } else {
        return res.status(500).json({ error: "Error actualizando imagen" });
      }
    } else {
      console.log("Error de carga de imagen");
      console.log(err);
      // Error de Multer
      if (err instanceof _multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ error: "Imagen demasiado pesada" });
        }
        return res.status(400).json({ error: err.message });
      }
      // Error desconocido
      return res.status(500).json({ error: err.message });
    }
  });
};

import * as sfile from "../services/file.service.js";

export const upload = function (req, res) {
  console.log("------------controller------------");
  sfile.upload(req, res);
};

export const uploadmem = function (req, res) {
  console.log("------------controller------------");
  sfile.uploadmem(req, res);
};

export const copiar = function (req, res) {
  console.log("------------controller------------");
  if (sfile.copiar(req.body.carpeta, req.body.filename)) {
    res.json({ message: "archivo copiado" });
  } else {
    res.status(500).json({ error: "no se pudo copiar los archivos" });
  }
};

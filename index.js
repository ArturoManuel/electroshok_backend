import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import api from "./routes.js";

const FRONTEND_URL = "http://localhost:4001";

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/api/v1", api);

const PUERTO = "4001";

app.listen(PUERTO, () => {
  console.log(`Listening on ${PUERTO}`);
});

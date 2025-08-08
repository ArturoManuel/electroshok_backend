import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import api from "./routes.js";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const PUERTO = Number(process.env.PORT || 4001);

const corsOptions = {
  // origin: FRONTEND_URL,
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", api);

app.listen(PUERTO, () => {
  console.log(`Listening on ${PUERTO}`);
});

export default app;

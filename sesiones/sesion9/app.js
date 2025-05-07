import _express from "express";
import _bodyParser from "body-parser";
import _cors from "./config/cors.js";
//import dotenv from "dotenv";
import orm from './config/sequelize.js';

import PUERTO from "./utils/constantes.js";
import api from "./routes.js"

//dotenv.config();
//console.log(process.env.JWT_SECRET);
const app= _express();
app.use(_bodyParser.json());
app.use(_cors);

//... endpoints ...
app.use("/api/v1", api);

await orm.sync({});


//... servidor ...
app.listen(PUERTO, () => {
    console.log('Listening on '+PUERTO);
});

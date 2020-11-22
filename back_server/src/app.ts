import express from "express";
import config from "./config/index";
import routerGet from "./api/router/users";
const app = express();

app.use("/", routerGet);
app.listen(config.port);

import cors from "cors";
import express from "express";
import corsOptions from "../config/cors.js";
import router from "../routes/index.js";
import errorHandler from "../middleware/errorHandler.js";
import notFound from "../middleware/notFound.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

export default app;

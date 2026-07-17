import express from "express";
import cors from "cors";
import router from "./router/url.routes.js";
import "dotenv/config";

const port = process.env.PORT || 8000;
const app = express();
app.disable("x-powered-by");

const url_LinkGuard = process.env.URL_LINKGUARD;
const corsOptions = {
  origin: url_LinkGuard,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/v1/url-scans", router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

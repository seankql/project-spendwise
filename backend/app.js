import express from "express";
import bodyParser from "body-parser";
import { router } from "./routers/router.js";
import * as Sentry from "@sentry/node";
import { config } from "./config/config.js";

const PORT = 3001;

export const app = express();
app.use(bodyParser.json());
app.use(express.static("static"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
Sentry.init({
  dsn: config.SENTRY_DSN,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

app.use("/api", router);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Something went wrong while starting server on PORT: ${PORT}`);
    console.log(err);
    return;
  }
  console.log("HTTP server on http://localhost:%s", PORT);
});

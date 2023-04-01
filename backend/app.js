import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./routers/router.js";
import * as Sentry from "@sentry/node";
import { config } from "./config/config.js";
import { sequelize } from "./database/database.js";

const PORT = 3001;

export const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("static"));

var corsOptions = {
  origin: ['https://sw.cscc09.rocks', 'https://api.sw.cscc09.rocks'],
  credentials: true,
}
app.use(cors(corsOptions));

Sentry.init({
  dsn: config.SENTRY_DSN,
});

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

app.use("/api", router);

process.on("SIGINT", () => {
  console.log("Closing database connection...");
  sequelize
    .close()
    .then(() => {
      console.log("Database connection closed successfully.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error closing database connection:", err);
      process.exit(1);
    });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Something went wrong while starting server on PORT: ${PORT}`);
    console.log(err);
    return;
  }
  console.log("HTTP server on http://localhost:%s", PORT);
});

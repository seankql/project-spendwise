import express from "express";
import bodyParser from "body-parser";
import router from "./routers/router.js";

const PORT = 3000;
export const app = express();
app.use(bodyParser.json());
app.use(express.static("static"));

app.use("/api", router);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Something went wrong while starting server on PORT: ${PORT}`);
    console.log(err);
    return;
  }
  console.log("HTTP server on http://localhost:%s", PORT);
});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middlewares/errorHandlers");
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`App running in port ${port}`));

module.exports = app;

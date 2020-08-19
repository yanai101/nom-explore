const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const exploreRouter = require("./component/explore.route");

const config = require("./config");

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credetinals", "true");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE , OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
  next();
});

app.use(morgan("dev"));

app.use("/api/explore", exploreRouter);

app.use((req, res, next) => {
  const error = new Error("Request not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const server = app.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`);
});

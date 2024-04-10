const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

const allowedOrigins = [
  process.env.CLIENT_URL1,
  process.env.CLIENT_URL2,
  process.env.CLIENT_URL3,
  process.env.CLIENT_URL4,
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

// CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "./uploads")));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");

app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;

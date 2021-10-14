const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const cors = require("cors");
const socket = require("socket.io");
const mongoose = require("mongoose");
const helmet = require("helmet");

// const db = require("./db");
const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");
const searchRoutes = require("./routes/search.routes");

const corsOptions = {
  origin: "http://localhost:8001",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// connection with .env
require("dotenv").config();

// polaczenie z expressem
const app = express();

// integracja socket z serverem
const server = app.listen(process.env.PORT || 8001, () => {
  console.log("Server is running on port: 8001");
});
const io = socket(server);

io.on("connection", () => console.log("New socket"));

app.use((req, res, next) => {
  req.io = io;
  next();
});

// ustawienia wtyczek
app.use(helmet());
app.use(cors());
app.engine(".hbs", hbs());
app.set("view engine", ".hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// endpointy
app.use("/api", testimonialsRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);
app.use("/api", searchRoutes);

app.use(express.static(path.join(__dirname, "/client/build")));

// Serve static files from the React app
app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.get("", cors(corsOptions), function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for only example.com." });
});

const NODE_ENV = process.env.NODE_ENV;

let dbURL = "";

if (NODE_ENV === "production") {
  dbURL = `mongodb+srv://wojbiel833:${process.env.PASS_KEY}@wojbiel833.p51y7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  console.log("Connected to remote DataBase");
} else if (NODE_ENV === "test") {
  dbURL = "mongodb://localhost:27017/wojbiel833test";
  console.log("Connected to test DataBase");
} else if (NODE_ENV === "dev") {
  dbURL = "mongodb://localhost:27017/wojbiel833";
  console.log("Connected to local DataBase");
} else {
  dbURL = "mongodb://localhost:27017/wojbiel833";
  console.log("Connected to local DataBase by default");
}

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
  console.log(`Connected to the ${dbURL} database`);
});

db.on("error", (err) => console.log("Error " + err));

module.exports = server;

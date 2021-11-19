require("dotenv").config();

const express = require("express");
const cors = require("cors");
require("./database");

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);

// notFound
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//catch all
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`⚡ API is running in http://localhost:${PORT}`);
});

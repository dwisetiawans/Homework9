const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API",
      version: "1.0.0",
      description: "Movie API Information",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Setup logging
const logStream = fs.createWriteStream(path.join(__dirname, "app.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: logStream }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

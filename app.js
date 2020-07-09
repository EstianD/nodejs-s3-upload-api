const http = require("http");
const config = require("./utils/config");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");

// Routers
const uploadRouter = require("./controllers/file-upload");

// Define Route
app.use("/api/file-upload", uploadRouter);

// Listen to port
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

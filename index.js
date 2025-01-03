const { port, env } = require("./src/config/vars");
const app = require("./src/config/express");
const mongoose = require("./src/config/mongoose");

// open mongoose connection
mongoose.connect();

// listen to requests
const server = app;
server.listen(port, () =>
  console.log(`Server started on port ${port} (${env})`)
);

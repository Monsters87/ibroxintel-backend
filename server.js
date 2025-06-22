const express = require("express");
const app = express();
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
setInterval(() => {}, 1 << 30); // Keeps the server alive indefinitely

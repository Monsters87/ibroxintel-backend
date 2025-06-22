const express = require("express");
const app = express();
const routes = require("./routes"); // Make sure this path correctly points to routes.js
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes); // All routes will be at /api/...

app.get("/", (req, res) => res.send("IbroxIntel backend is live!"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

setInterval(() => {}, 1 << 30); // Keeps the container alive

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Import routes correctly
const routes = require("./routes");
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("✅ IbroxIntel backend running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

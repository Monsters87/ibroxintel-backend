const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

// Allow Netlify frontend
app.use(
  cors({
    origin: "https://ibroxintel.netlify.app",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

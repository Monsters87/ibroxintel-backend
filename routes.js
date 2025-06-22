const express = require("express");
const router = express.Router();
const db = require("./db");

// Health check
router.get("/", (req, res) => {
  res.send("IbroxIntel backend is live!");
});

// One-time DB setup route
router.get("/init-db", async (req, res) => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        value TEXT
      );
    `);
    res.send("✅ Players table created (or already exists).");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Failed to create table.");
  }
});

// View players
router.get("/players", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM players");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

module.exports = router;

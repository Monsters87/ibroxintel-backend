const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Health check route
router.get("/", (req, res) => {
  res.send("IbroxIntel backend is live!");
});

// Get player data from the database
router.get("/players", async (req, res) => {
  try {
    const result = await pool.query("SELECT name, position, value FROM players");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

// Future: scraper trigger route
router.get("/scrape", (req, res) => {
  res.send("Scraping not yet implemented.");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("./db");

// Get all rumours
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM rumours");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching rumours:", error);
    res.status(500).json({ error: "Failed to fetch rumours" });
  }
});

// One-time table setup (optional but useful)
router.get("/init", async (req, res) => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS rumours (
        id SERIAL PRIMARY KEY,
        player TEXT NOT NULL,
        source TEXT NOT NULL,
        rumour TEXT NOT NULL
      );
    `);
    res.send("✅ Rumours table created or already exists.");
  } catch (error) {
    console.error("Rumours table creation failed:", error);
    res.status(500).send("❌ Could not create rumours table.");
  }
});

module.exports = router;

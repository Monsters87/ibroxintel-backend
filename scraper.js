// scraper.js
const axios = require("axios");
const db = require("./db");

async function fetchAndStorePlayers() {
  try {
    // TEMP: using placeholder data
    const players = [
      { name: "Player One", position: "Midfielder", value: "£2M" },
      { name: "Player Two", position: "Defender", value: "£1.5M" },
    ];

    for (const player of players) {
      await db.query(
        `INSERT INTO players (name, position, value)
         VALUES ($1, $2, $3)
         ON CONFLICT (name) DO NOTHING`,
        [player.name, player.position, player.value]
      );
    }

    console.log("Player data inserted successfully");
  } catch (error) {
    console.error("Error inserting players:", error.message);
  }
}

if (require.main === module) {
  fetchAndStorePlayers();
}

module.exports = fetchAndStorePlayers;

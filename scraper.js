const db = require("./db");

async function runScraper() {
  try {
    // Dummy player data
    const players = [
      { name: "Todd Cantwell", position: "Midfielder", value: "£3.5M" },
      { name: "James Tavernier", position: "Defender", value: "£4M" },
      { name: "Jack Butland", position: "Goalkeeper", value: "£2M" }
    ];

    // Dummy rumours data
    const rumours = [
      { player: "Todd Cantwell", source: "BBC Sport", credibility: "High" },
      { player: "James Tavernier", source: "Sky Sports", credibility: "Medium" },
      { player: "Jack Butland", source: "Daily Record", credibility: "Low" }
    ];

    for (const player of players) {
      await db.query(
        "INSERT INTO players (name, position, value) VALUES ($1, $2, $3)",
        [player.name, player.position, player.value]
      );
    }

    for (const rumour of rumours) {
      await db.query(
        "INSERT INTO rumours (player, source, credibility) VALUES ($1, $2, $3)",
        [rumour.player, rumour.source, rumour.credibility]
      );
    }

    console.log("✅ Dummy players and rumours inserted.");
  } catch (error) {
    console.error("❌ Scraper error:", error);
    throw error;
  }
}

module.exports = runScraper;

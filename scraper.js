const db = require("./db");

async function runScraper() {
  try {
    const players = [
      { name: "Todd Cantwell", position: "Midfielder", value: "£3.5M" },
      { name: "James Tavernier", position: "Defender", value: "£4M" },
      { name: "Jack Butland", position: "Goalkeeper", value: "£2M" }
    ];

    for (const player of players) {
      const exists = await db.query(
        "SELECT * FROM players WHERE name = $1",
        [player.name]
      );

      if (exists.rows.length === 0) {
        await db.query(
          "INSERT INTO players (name, position, value) VALUES ($1, $2, $3)",
          [player.name, player.position, player.value]
        );
      }
    }

    console.log("✅ Player data updated.");
  } catch (error) {
    console.error("❌ Scraper error:", error);
    throw error;
  }
}

module.exports = runScraper;

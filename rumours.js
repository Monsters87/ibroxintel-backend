const db = require("./db");

async function runRumourScraper() {
  try {
    const rumours = [
      { player: "Todd Cantwell", source: "BBC Sport", credibility: "High" },
      { player: "James Tavernier", source: "Sky Sports", credibility: "Medium" },
      { player: "Jack Butland", source: "Daily Record", credibility: "Low" }
    ];

    for (const rumour of rumours) {
      const existing = await db.query(
        "SELECT * FROM rumours WHERE player = $1 AND source = $2",
        [rumour.player, rumour.source]
      );

      if (existing.rows.length === 0) {
        await db.query(
          "INSERT INTO rumours (player, source, credibility) VALUES ($1, $2, $3)",
          [rumour.player, rumour.source, rumour.credibility]
        );
        console.log(`✅ Added rumour: ${rumour.player} from ${rumour.source}`);
      } else {
        console.log(`⏩ Skipped duplicate: ${rumour.player} from ${rumour.source}`);
      }
    }

    console.log("✅ Rumours scraping complete.");
  } catch (error) {
    console.error("❌ Rumour scraper error:", error);
    throw error;
  }
}

module.exports = runRumourScraper;

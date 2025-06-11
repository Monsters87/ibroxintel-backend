const axios = require('axios');

const trustedSources = ['Fabrizio Romano', 'Chris Jack'];

async function getRumours(req, res) {
    // Placeholder - real logic will be added during scaling
    res.json([{ player: 'John Doe', source: 'Fabrizio Romano', credibility: 'High' }]);
}

async function getPlayer(req, res) {
    const { name } = req.params;
    // Placeholder - real API or database logic goes here
    res.json({ name, position: 'Midfielder', age: 26, nationality: 'Scottish' });
}

module.exports = { getRumours, getPlayer };
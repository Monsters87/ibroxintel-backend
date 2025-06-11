const express = require('express');
const router = express.Router();
const { getRumours, getPlayer } = require('./scraper');

router.get('/rumours', getRumours);
router.get('/player/:name', getPlayer);

module.exports = router;
const express = require('express');
const gamesCtrl = require('../controllers/games.controller');

const router = express.Router();

/* get games homepage */
router.get('/', gamesCtrl);

module.exports = router;

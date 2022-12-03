const express = require('express');
const gamesCtrl = require('../controllers/games.controller');

const router = express.Router();

/* get games homepage */
router.get('/', gamesCtrl.getAllGames);

/* separate league */
router.get('/pleague', gamesCtrl.getPleague);
router.get('/t1league', gamesCtrl.getT1league);

module.exports = router;

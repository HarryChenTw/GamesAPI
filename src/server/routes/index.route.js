const express = require('express');
const gamesRouter = require('./games.route');

const router = express.Router();

/* get api homepage */
router.get('/', (req, res) => {
    res.send('API Page');
});

/* get games homepage */
router.use('/games', gamesRouter);

module.exports = router;

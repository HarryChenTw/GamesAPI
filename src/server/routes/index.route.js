const express = require('express');
const gamesRouter = require('./games.route');

const router = express.Router();

/* get api homepage */
router.get('/', (req, res) => {
    const apiDes = '\
    <h2> API Usage Guide </h2> \
    <ul style="line-height:2;">\
        <li><b> .../api/games </b> → get all upcoming games from all leagues</li>\
        <ul>\
            <li><b> .../api/games/pleague </b>  → get upcoming games from P League </li>\
            <li><b> .../api/games/t1league </b>  → get upcoming games from T1 League </li>\
            <li><b> .../api/games/uba </b>  → get upcoming games from UBA </li>\
        </ul>\
    </ul>\
    ';
    res.send(apiDes);
});

/* get games homepage */
router.use('/games', gamesRouter);

module.exports = router;

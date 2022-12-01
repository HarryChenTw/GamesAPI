const gamesModule = require('../modules/games.module');

const getGames = async (req, res) => {
    const pGames = await gamesModule.getPLeagueThisWeek().catch((err) => res.send(err));
    const t1Games = await gamesModule.getT1LeagueThisWeek().catch((err) => res.send(err));
    res.send(pGames.concat(t1Games));
};

module.exports = getGames;

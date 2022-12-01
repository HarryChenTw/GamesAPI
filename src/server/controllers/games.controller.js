const gamesModule = require('../modules/games.module');

const getGames = async (req, res) => {
    const pGames = await gamesModule.getPLeagueThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));
    const t1Games = await gamesModule.getT1LeagueThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));
    const games = [pGames, t1Games];
    const concatedGames = await games[0].concat(...games.slice(1));

    const sortedGames = await concatedGames.sort((a, b) => {
        const aDatetime = new Date(a.datetime);
        const bDatatime = new Date(b.datetime);
        return aDatetime - bDatatime;
    });

    res.send(sortedGames);
};

module.exports = getGames;

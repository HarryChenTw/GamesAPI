const gamesModule = require('../modules/games.module');

const getGames = async (req, res) => {
    const pGames = await gamesModule.getPLeagueThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));
    const t1Games = await gamesModule.getT1LeagueThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));
    const games = [pGames, t1Games];

    // concat data from every leagues
    const concatedGames = await games[0].concat(...games.slice(1));

    // sort by date
    const sortedGames = await concatedGames.sort((a, b) => {
        const aDatetime = new Date(a.datetime);
        const bDatatime = new Date(b.datetime);
        return aDatetime - bDatatime;
    });

    // convert timezone of date (for more readable)
    for (let i = 0; i < sortedGames.length; i += 1) {
        sortedGames[i].datetime = new Date(sortedGames[i].datetime).toLocaleString('en-US', { timeZone: 'Asia/Taipei' });
    }

    res.send(sortedGames);
};

module.exports = getGames;

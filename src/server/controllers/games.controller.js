const gamesModule = require('../modules/games.module');

const getAllGames = async (req, res) => {
    const pGames = await gamesModule.getPLeagueThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));
    const t1Games = await gamesModule.getT1LeagueThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));
    const ubaGames = await gamesModule.getUBAThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));
    const games = [pGames, t1Games, ubaGames];

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

const getPleague = async (req, res) => {
    const pGames = await gamesModule.getPLeagueThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));

    // sort by date
    const sortedGames = await pGames.sort((a, b) => {
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

const getT1league = async (req, res) => {
    const t1Games = await gamesModule.getT1LeagueThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));

    // sort by date
    const sortedGames = await t1Games.sort((a, b) => {
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

const getUBA = async (req, res) => {
    const ubaGames = await gamesModule.getUBAThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));

    // sort by date
    const sortedGames = await ubaGames.sort((a, b) => {
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

module.exports = {
    getAllGames,
    getPleague,
    getT1league,
    getUBA,
};

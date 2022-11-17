const gamesModule = require('../modules/games.module');

const getGames = (req, res) => {
    gamesModule.getGamesThisWeek().then((result) => {
        res.send(result); // 成功回傳result結果
    }).catch((err) => res.send(err)); // 失敗回傳錯誤訊息
};

module.exports = getGames;

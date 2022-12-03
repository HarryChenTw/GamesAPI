const mysql = require('mysql');
const config = require('../../config/config');

const connectionPool = mysql.createPool({
    user: config.mysqlUserName,
    password: config.mysqlPass,
    host: config.mysqlHost,
    port: config.mysqlPort,
    database: config.mysqlDatabase,
    waitForConnections: true, // 無可用連線時是否等待pool連線釋放(預設為true)
    connectionLimit: 10, // 連線池可建立的總連線數上限(預設最多為10個連線數)
});

const pleagueQuery = ' \
    SELECT league, game_type, datetime, weekday, away_team, home_team \
    FROM pleague \
    WHERE NOW() <= datetime \
        AND datetime <= DATE(NOW() + INTERVAL(7 - WEEKDAY(NOW())) DAY) \
';

const getPLeagueThisWeek = () => new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            reject(connectionErr);
        } else {
            connection.query(pleagueQuery, (queryErr, rows) => {
                if (queryErr) {
                    reject(queryErr);
                } else {
                    resolve(rows);
                }
            });
            connection.release();
        }
    });
});

const t1leagueQuery = ' \
    SELECT league, game_type, datetime, weekday, away_team, home_team \
    FROM t1league \
    WHERE NOW() <= datetime \
        AND datetime <= DATE(NOW() + INTERVAL(7 - WEEKDAY(NOW())) DAY) \
';

const getT1LeagueThisWeek = () => new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            reject(connectionErr);
        } else {
            connection.query(t1leagueQuery, (queryErr, rows) => {
                if (queryErr) {
                    reject(queryErr);
                } else {
                    resolve(rows);
                }
            });
            connection.release();
        }
    });
});

const ubaQuery = " \
    SELECT league, game_type, datetime, weekday, team_1, team_2 \
    FROM uba \
    WHERE NOW() <= datetime \
        AND datetime <= DATE(NOW() + INTERVAL(7 - WEEKDAY(NOW())) DAY) \
        AND (team_1 in ('政治大學', '健行科大', '輔仁大學') OR team_2 in ('政治大學', '健行科大', '輔仁大學'))\
";

const getUBAThisWeek = () => new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            reject(connectionErr);
        } else {
            connection.query(ubaQuery, (queryErr, rows) => {
                if (queryErr) {
                    reject(queryErr);
                } else {
                    resolve(rows);
                }
            });
            connection.release();
        }
    });
});

module.exports = { getPLeagueThisWeek, getT1LeagueThisWeek, getUBAThisWeek };

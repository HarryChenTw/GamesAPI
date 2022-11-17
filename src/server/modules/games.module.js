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

const getThisWeekGamesQuery = ' \
    SELECT * \
    FROM PLeague \
    WHERE NOW() <= datetime \
        AND datetime <= DATE(NOW() + INTERVAL(7 - WEEKDAY(NOW())) DAY) \
';

const getGamesThisWeek = () => new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            reject(connectionErr);
        } else {
            connection.query(getThisWeekGamesQuery, (queryErr, rows) => {
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

module.exports = { getGamesThisWeek };

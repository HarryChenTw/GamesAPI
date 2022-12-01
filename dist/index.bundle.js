/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config/config.js":
/*!******************************!*\
  !*** ./src/config/config.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Joi = __webpack_require__(/*! joi */ \"joi\"); // Joi is for checking all env var in .env is valid\n\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)(); // load all from .env (dotenv will load it automatically) store into process.env\n\n// set all env var's type\nconst envVarSchema = Joi.object({\n  NODE_ENV: Joi.string().default('development').valid('development', 'production'),\n  PORT: Joi.number().default(8080),\n  VERSION: Joi.string(),\n  MYSQL_HOST: Joi.string().default('127.0.0.1'),\n  MYSQL_PORT: Joi.number().default(3000),\n  MYSQL_USER: Joi.string(),\n  MYSQL_PASS: Joi.string(),\n  MYSQL_DATABASE: Joi.string()\n}).unknown().required();\n\n// validate env var type\nconst {\n  error,\n  value: envVars\n} = envVarSchema.validate(process.env);\nif (error) {\n  throw new Error(`Config validation error: ${error.message}`);\n}\nconst config = {\n  version: envVars.VERSION,\n  env: envVars.NODE_ENV,\n  port: envVars.PORT,\n  mysqlPort: envVars.MYSQL_PORT,\n  mysqlHost: envVars.MYSQL_HOST,\n  mysqlUserName: envVars.MYSQL_USER,\n  mysqlPass: envVars.MYSQL_PASS,\n  mysqlDatabase: envVars.MYSQL_DATABASE\n};\nmodule.exports = config;\n\n//# sourceURL=webpack://gamesapi/./src/config/config.js?");

/***/ }),

/***/ "./src/config/express.js":
/*!*******************************!*\
  !*** ./src/config/express.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst config = __webpack_require__(/*! ./config */ \"./src/config/config.js\");\nconst index = __webpack_require__(/*! ../server/routes/index.route */ \"./src/server/routes/index.route.js\");\nconst app = express();\n\n/* GET home page. */\napp.get('/', (req, res) => {\n  res.send(`http://127.0.0.1:${config.port} (${config.env}) homepage`);\n});\napp.use('/api', index);\n\n// parse body params and attache them to req.body\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({\n  extended: true\n}));\nmodule.exports = app;\n\n//# sourceURL=webpack://gamesapi/./src/config/express.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\nconst config = __webpack_require__(/*! ./config/config */ \"./src/config/config.js\");\nconst app = __webpack_require__(/*! ./config/express */ \"./src/config/express.js\");\nif (!module.parent) {\n  app.listen(config.port, () => {\n    console.log(`server started on port http://127.0.0.1:${config.port} (${config.env})`);\n  });\n}\n\n//# sourceURL=webpack://gamesapi/./src/index.js?");

/***/ }),

/***/ "./src/server/controllers/games.controller.js":
/*!****************************************************!*\
  !*** ./src/server/controllers/games.controller.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const gamesModule = __webpack_require__(/*! ../modules/games.module */ \"./src/server/modules/games.module.js\");\nconst getGames = async (req, res) => {\n  const pGames = await gamesModule.getPLeagueThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));\n  const t1Games = await gamesModule.getT1LeagueThisWeek().catch(() => res.send('Error 500 : failed fetching data from database'));\n  const games = [pGames, t1Games];\n\n  // concat data from every leagues\n  const concatedGames = await games[0].concat(...games.slice(1));\n\n  // sort by date\n  const sortedGames = await concatedGames.sort((a, b) => {\n    const aDatetime = new Date(a.datetime);\n    const bDatatime = new Date(b.datetime);\n    return aDatetime - bDatatime;\n  });\n\n  // convert timezone of date (for more readable)\n  for (let i = 0; i < sortedGames.length; i += 1) {\n    sortedGames[i].datetime = new Date(sortedGames[i].datetime).toLocaleString('en-US', {\n      timeZone: 'Asia/Taipei'\n    });\n  }\n  res.send(sortedGames);\n};\nmodule.exports = getGames;\n\n//# sourceURL=webpack://gamesapi/./src/server/controllers/games.controller.js?");

/***/ }),

/***/ "./src/server/modules/games.module.js":
/*!********************************************!*\
  !*** ./src/server/modules/games.module.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mysql = __webpack_require__(/*! mysql */ \"mysql\");\nconst config = __webpack_require__(/*! ../../config/config */ \"./src/config/config.js\");\nconst connectionPool = mysql.createPool({\n  user: config.mysqlUserName,\n  password: config.mysqlPass,\n  host: config.mysqlHost,\n  port: config.mysqlPort,\n  database: config.mysqlDatabase,\n  waitForConnections: true,\n  // 無可用連線時是否等待pool連線釋放(預設為true)\n  connectionLimit: 10 // 連線池可建立的總連線數上限(預設最多為10個連線數)\n});\n\nconst pleagueQuery = ' \\\n    SELECT league, game_type, datetime, weekday, away_team, home_team \\\n    FROM pleague \\\n    WHERE NOW() <= datetime \\\n        AND datetime <= DATE(NOW() + INTERVAL(7 - WEEKDAY(NOW())) DAY) \\\n';\nconst getPLeagueThisWeek = () => new Promise((resolve, reject) => {\n  connectionPool.getConnection((connectionErr, connection) => {\n    if (connectionErr) {\n      reject(connectionErr);\n    } else {\n      connection.query(pleagueQuery, (queryErr, rows) => {\n        if (queryErr) {\n          reject(queryErr);\n        } else {\n          resolve(rows);\n        }\n      });\n      connection.release();\n    }\n  });\n});\nconst t1leagueQuery = ' \\\n    SELECT league, game_type, datetime, weekday, away_team, home_team \\\n    FROM t1league \\\n    WHERE NOW() <= datetime \\\n        AND datetime <= DATE(NOW() + INTERVAL(7 - WEEKDAY(NOW())) DAY) \\\n';\nconst getT1LeagueThisWeek = () => new Promise((resolve, reject) => {\n  connectionPool.getConnection((connectionErr, connection) => {\n    if (connectionErr) {\n      reject(connectionErr);\n    } else {\n      connection.query(t1leagueQuery, (queryErr, rows) => {\n        if (queryErr) {\n          reject(queryErr);\n        } else {\n          resolve(rows);\n        }\n      });\n      connection.release();\n    }\n  });\n});\nmodule.exports = {\n  getPLeagueThisWeek,\n  getT1LeagueThisWeek\n};\n\n//# sourceURL=webpack://gamesapi/./src/server/modules/games.module.js?");

/***/ }),

/***/ "./src/server/routes/games.route.js":
/*!******************************************!*\
  !*** ./src/server/routes/games.route.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst gamesCtrl = __webpack_require__(/*! ../controllers/games.controller */ \"./src/server/controllers/games.controller.js\");\nconst router = express.Router();\n\n/* get games homepage */\nrouter.get('/', gamesCtrl);\nmodule.exports = router;\n\n//# sourceURL=webpack://gamesapi/./src/server/routes/games.route.js?");

/***/ }),

/***/ "./src/server/routes/index.route.js":
/*!******************************************!*\
  !*** ./src/server/routes/index.route.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst gamesRouter = __webpack_require__(/*! ./games.route */ \"./src/server/routes/games.route.js\");\nconst router = express.Router();\n\n/* get api homepage */\nrouter.get('/', (req, res) => {\n  res.send('API Page');\n});\n\n/* get games homepage */\nrouter.use('/games', gamesRouter);\nmodule.exports = router;\n\n//# sourceURL=webpack://gamesapi/./src/server/routes/index.route.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("joi");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("mysql");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
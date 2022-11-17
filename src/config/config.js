const Joi = require('joi'); // Joi is for checking all env var in .env is valid

require('dotenv').config(); // load all from .env (dotenv will load it automatically) store into process.env

// set all env var's type
const envVarSchema = Joi.object({
    NODE_ENV: Joi.string().default('development').valid('development', 'production'),
    PORT: Joi.number().default(8080),
    VERSION: Joi.string(),
    MYSQL_HOST: Joi.string().default('127.0.0.1'),
    MYSQL_PORT: Joi.number().default(3000),
    MYSQL_USER: Joi.string(),
    MYSQL_PASS: Joi.string(),
    MYSQL_DATABASE: Joi.string(),
}).unknown().required();

// validate env var type
const { error, value: envVars } = envVarSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    version: envVars.VERSION,
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mysqlPort: envVars.MYSQL_PORT,
    mysqlHost: envVars.MYSQL_HOST,
    mysqlUserName: envVars.MYSQL_USER,
    mysqlPass: envVars.MYSQL_PASS,
    mysqlDatabase: envVars.MYSQL_DATABASE,
};

module.exports = config;

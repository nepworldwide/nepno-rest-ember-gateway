"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');
const processArgs = require('minimist')(process.argv.slice(2));
const loggerIp = process.env.loggerIp || processArgs.loggerIp || "0.0.0.0";
const loggerPort = process.env.loggerPort || processArgs.loggerPort || 9200;
const loggerLevel = process.env.loggerLevel || processArgs.loggerLevel || 'info';
const loggerFileLevel = process.env.loggerFileLevel || processArgs.loggerFileLevel || 'error';
const loggerConsoleLevel = process.env.loggerConsoleLevel || processArgs.loggerConsoleLevel || 'error';
console.log('Elastic Ip :', loggerIp);
console.log('Elastic Port :', loggerPort);
const esTransportOpts = {
    level: loggerLevel,
    indexPrefix: 'sisyfos',
    clientOpts: { node: 'http://' + loggerIp + ':' + String(loggerPort) }
};
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "logfile.log", level: loggerFileLevel }),
        new winston.transports.Console({ level: loggerConsoleLevel }),
        new Elasticsearch(esTransportOpts) //everything info and above goes to elastic
    ]
});
exports.logger = logger;
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
//# sourceMappingURL=logger.js.map
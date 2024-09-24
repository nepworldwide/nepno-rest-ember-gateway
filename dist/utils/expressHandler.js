"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const getState_1 = require("../APIHandlers/getState");
const setValue_1 = require("../APIHandlers/setValue");
const setMatrix_1 = require("../APIHandlers/setMatrix");
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const socketServer = require('socket.io')(server);
exports.socketServer = socketServer;
exports.expressInit = () => {
    logger_1.logger.info('REST Initialising WebServer');
    app.use('/', express.static(path.join(__dirname, '..')));
    server.listen(80);
    server.on('connection', () => {
        app.get('/', (req, res) => {
            console.log(req.params);
            res.send('Access REST api by calling /state, queries: ?full  and ?path=the/tree/of/our/ember');
        })
            .get('/state', (req, res) => {
            getState_1.getState(req, res);
        })
            .post('/setvalue', (req, res) => {
            setValue_1.setValue(req, res);
        })
            .post('/setmatrix', (req, res) => {
            setMatrix_1.setMatrix(req, res);
        });
    });
    socketServer.on('connection', ((socket) => {
        logger_1.logger.info('REST Client connected :' + String(socket.client.id), {});
        // global.mainThreadHandler.socketServerHandlers(socket)
    }));
};
//# sourceMappingURL=expressHandler.js.map
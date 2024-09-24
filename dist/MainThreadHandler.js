"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressHandler_1 = require("./utils/expressHandler");
const EmberClientConnection_1 = require("./utils/EmberClientConnection");
const EmberServerConnection_1 = require("./utils/EmberServerConnection");
const processArgs = require('minimist')(process.argv.slice(2));
const logger_1 = require("./utils/logger");
class MainThreadHandlers {
    constructor() {
        logger_1.logger.info('Setting up MainThreadHandlers', {});
        if (global.emberIp === "0.0.0.0") {
            // Start Ember Server if no emberIp is added:
            global.emberServerConnection = new EmberServerConnection_1.EmberServerConnection();
            this.waitForServer();
        }
        else {
            // If an IP adress is parsed it starts as a Ember Client otherwise it starts as a local client:
            global.emberClientConnection = new EmberClientConnection_1.EmberClientConnection();
            expressHandler_1.expressInit();
        }
    }
    waitForServer() {
        if (!global.emberServerReady) {
            console.log('waiting for Ember Server start');
            let NextTimerRef = setTimeout(() => {
                this.waitForServer();
            }, 100);
        }
        else {
            console.log('Ember server started - connecting client');
            global.emberClientConnection = new EmberClientConnection_1.EmberClientConnection();
            expressHandler_1.expressInit();
        }
    }
}
exports.MainThreadHandlers = MainThreadHandlers;
//# sourceMappingURL=MainThreadHandler.js.map
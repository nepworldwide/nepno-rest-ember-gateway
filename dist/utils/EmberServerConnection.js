"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const node_emberplus_1 = require("node-emberplus");
const { ParameterType, FunctionArgument } = require("node-emberplus").EmberLib;
const logger_1 = require("./logger");
const fs = require('fs');
const path = require('path');
class EmberServerConnection {
    constructor() {
        logger_1.logger.info("Setting up Ember Server");
        let root = this.createEmberTree();
        this.emberConnection = new node_emberplus_1.EmberServer('0.0.0.0', global.emberPort, root);
        this.emberConnection
            .on('event', (event) => {
            console.log('Ember Server Event received : ', event);
        })
            .on('error', (error) => {
            if ((error.message + '').match(/econnrefused/i) ||
                (error.message + '').match(/disconnected/i)) {
                logger_1.logger.error('Ember connection not establised');
            }
            else {
                logger_1.logger.error('Ember connection unknown error' + error.message);
            }
        });
        logger_1.logger.info('Setting up Ember Server');
        this.emberConnection.listen()
            .then(() => {
            global.emberServerReady = true;
            console.log("Ember Server is listening");
        })
            .catch((error) => {
            console.log(error.stack);
        });
        let timer = setInterval(() => {
            this.emberStateToFile();
        }, 2000);
    }
    createEmberTree() {
        if (!fs.existsSync(path.resolve('storage', global.emberFile))) {
            logger_1.logger.error('Missing ' + global.emberFile + ' file in storage folder');
        }
        logger_1.logger.info('Reading EmberTree form file');
        let treeJson = JSON.parse(fs.readFileSync(path.resolve('storage', global.emberFile), (error) => {
            if (error) {
                console.log(error);
                logger_1.logger.error('Error reading Ember file');
            }
        }));
        console.log('Ember Tree :', treeJson);
        return node_emberplus_1.EmberServer.JSONtoTree(treeJson);
    }
    emberStateToFile() {
        let json = JSON.stringify(this.emberConnection.toJSON());
        logger_1.logger.info('Updating emberstate in file');
        fs.writeFile(path.resolve('storage', global.emberFile), json, 'utf8', (error) => {
            if (error) {
                console.log(error);
                logger_1.logger.error('Error writing Ember-dump file');
            }
        });
    }
}
exports.EmberServerConnection = EmberServerConnection;
//# sourceMappingURL=EmberServerConnection.js.map
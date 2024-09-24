"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const node_emberplus_1 = require("node-emberplus");
const logger_1 = require("./logger");
const fs = require('fs');
const path = require('path');
class EmberClientConnection {
    constructor() {
        this.updateObjectFromArray = (sourceObject, updatedElement, referenceArray, index) => {
            let child = sourceObject[referenceArray[index]];
            if (index < referenceArray.length - 1) {
                this.updateObjectFromArray(child, updatedElement, referenceArray, index + 1);
            }
            else {
                sourceObject[referenceArray[index]] = updatedElement;
            }
        };
        this.getObjectFromArray = (sourceObject, referenceArray, index) => {
            let child = sourceObject[referenceArray[index]];
            if (index < referenceArray.length - 1) {
                return this.getObjectFromArray(child, referenceArray, index + 1);
            }
            else {
                return child;
            }
        };
        logger_1.logger.info("Setting up Ember Client Connection");
        this.client = new node_emberplus_1.EmberClient(global.emberIp, global.emberPort);
        this.client.on('error', (error) => {
            if ((error.message + '').match(/econnrefused/i) ||
                (error.message + '').match(/disconnected/i)) {
                logger_1.logger.error('Ember client connection not establised');
            }
            else {
                logger_1.logger.error('Ember client connection unknown error' + error.message);
            }
        });
        this.client.on('disconnected', () => {
            logger_1.logger.error('Lost Ember connection');
        });
        logger_1.logger.info('Ember Client Connecting to Ember');
        this.client.connect()
            .then(() => {
            logger_1.logger.info("Ember Client Getting Directory");
            return this.client.getDirectory();
        })
            .then((r) => {
            if (global.cachedClient) {
                logger_1.logger.info('Ember Client Expanding Tree');
                this.client.expand(r.elements[0])
                    .then(() => {
                    this.convertRootToObject(this.client.root);
                    this.dumpEmberTree(this.client.root);
                });
            }
            else {
                logger_1.logger.info("Ember Client Ready");
            }
        })
            .catch((e) => {
            logger_1.logger.error(e.stack);
        });
    }
    dumpEmberTree(root) {
        let json = JSON.stringify(JSON.parse(JSON.stringify(root)).elements);
        if (!fs.existsSync(path.resolve('storage', global.emberFile))) {
            fs.mkdirSync('storage');
            logger_1.logger.error('Missing embertree.json file in storage folder');
        }
        logger_1.logger.info('Writing EmberTree to file');
        fs.writeFile(path.resolve('storage', global.emberFile), json, 'utf8', (error) => {
            if (error) {
                console.log(error);
                logger_1.logger.error('Error writing Ember-dump file');
            }
        });
    }
    convertRootToObject(root) {
        let rootObj = JSON.parse(JSON.stringify(root));
        global.emberClientStore = {};
        global.emberClientStore[rootObj.elements[0].identifier] = this.convertChildToObject(rootObj.elements[0]);
        console.log('Device Object :', global.emberClientStore);
        logger_1.logger.info('Tree converted to object');
    }
    convertChildToObject(node) {
        if (node.children) {
            let childNode = {};
            node.children.forEach((item) => {
                let temp = this.convertChildToObject(item);
                childNode[item.identifier] = temp;
            });
            return childNode;
        }
        else {
            return node;
        }
    }
    setValue(path, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.client.getElementByPath(path);
            yield this.client.setValueNoAck(element, value);
            yield this.updatePath(path);
            return true;
        });
    }
    updatePath(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.client.getElementByPath(path);
            if (global.cachedClient) {
                let pathArray = path.split('/');
                this.updateObjectFromArray(global.emberClientStore, element, pathArray, 0);
            }
            return element;
        });
    }
}
exports.EmberClientConnection = EmberClientConnection;
//# sourceMappingURL=EmberClientConnection.js.map
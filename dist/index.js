"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainThreadHandler_1 = require("./MainThreadHandler");
const processArgs = require('minimist')(process.argv.slice(2));
// Set ember env vars: (Logger env´s are handled in utils/logget.ts)
global.emberIp = process.env.emberIp || processArgs.emberIp || "0.0.0.0";
global.emberPort = process.env.emberPort || processArgs.emberPort || "9000";
global.emberFile = process.env.emberFile || processArgs.emberFile || "embertree.json";
global.cachedClient = process.env.cachedClient || processArgs.cachedClient || undefined;
global.emberServerReady = false;
global.mainThreadHandler = new MainThreadHandler_1.MainThreadHandlers();
//# sourceMappingURL=index.js.map
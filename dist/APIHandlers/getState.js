"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getState = (req, res) => {
    console.log('Query : ', req.query);
    if (typeof (req.query.full) !== 'undefined') {
        if (global.cachedClient) {
            res.json(global.emberClientStore);
        }
        else {
            res.send('a full request is only available in cached mode');
        }
    }
    else if (typeof (req.query.path) !== 'undefined') {
        global.emberClientConnection.updatePath(req.query.path)
            .then((node) => {
            res.json(node);
        });
    }
};
//# sourceMappingURL=getState.js.map
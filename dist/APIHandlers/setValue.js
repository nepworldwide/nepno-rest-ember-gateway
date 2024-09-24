"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setValue = (req, res) => {
    console.log('Query : ', req.query);
    if (typeof (req.query.path) !== 'undefined') {
        global.emberClientConnection.setValue(req.query.path, req.query.value);
        res.send('Value Changed');
    }
};
//# sourceMappingURL=setValue.js.map
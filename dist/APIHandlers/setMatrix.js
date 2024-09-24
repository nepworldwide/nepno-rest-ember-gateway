"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMatrix = (req, res) => {
    /*
    .then(() => client.getElementByPath("0.1.0"))
   .then(matrix => {
      console.log("Connecting source 1 to target 0);
      return client.matrixConnect(matrix, 0, [1]);
   })
   .then(() => client.matrixDisconnect(matrix, 0, [1]))
   .then(() => client.matrixSetConnection(matrix, 0, [0,1]))
   .then(matrix => client.getElementByPath(matrix.getPath()))
   .then(() => client.disconnect());
    */
    console.log('Query : ', req.query);
    if (typeof (req.query.path) !== 'undefined') {
        global.emberClientConnection.client.getElementByPath(req.query.path)
            .then((node) => {
            global.emberClientConnection.client.matrixConnect(node, req.query.dest, [req.query.src]);
            res.send('Matrix Connection changed');
        });
    }
};
//# sourceMappingURL=setMatrix.js.map
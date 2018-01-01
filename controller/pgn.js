const mongoose = require('mongoose');
const Variant = require('../model/Variant');
const ObjectId = mongoose.Types.ObjectId;
const pgnParser = require('pgn-parser');

mongoose.connect('mongodb://localhost/reperto', { useMongoClient: true });
mongoose.Promise = global.Promise;

// CRUD

exports.toJSON = (req, res, next) => {
    pgnParser((err, parser) => {
        const [result] = parser.parse(req.body.pgn);
        console.log(result);
        console.log(JSON.stringify(result));
        res.send(200);
        next();
    });
}

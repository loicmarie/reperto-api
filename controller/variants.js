const mongoose = require('mongoose');
const Variant = require('../model/Variant');
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect('mongodb://localhost/reperto', { useMongoClient: true });
mongoose.Promise = global.Promise;

// CRUD

exports.list = (req, res, next) => {
    Variant.find({})
        .exec((err, variants) => {

        if (err) next(err);
        res.send(variants);
        next();
    });
}

exports.create = (req, res, next) => {
    let newVariant = new Variant({
        name: req.body.name,
        nodes: req.body.nodes,
        color: req.body.color
    });
    newVariant.markModified('nodes');
    newVariant.save((err, variant) => {

        if (err) next(err);
        res.send(variant);
        next();
    });
}

exports.get = (req, res, next) => {
    Variant.findOne({'_id': req.params.id})
        .exec((err, variant) => {

        if (err) next(err);
        res.send(variant);
        next();
    });
}

exports.update = (req, res, next) => {
    Variant.update({'_id': req.params.id}, req.body)
        .exec((err, variant) => {

        if (err) next(err);
        res.send(200);
        next();
    });
}

exports.delete = (req, res, next) => {
    Variant.remove({'_id': req.params.id}, err => {

        if (err) next(err);
        res.send(200);
        next();
    });
}

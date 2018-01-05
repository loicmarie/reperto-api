const mongoose = require('mongoose');
const Variant = require('../model/Variant');
const ObjectId = mongoose.Types.ObjectId;
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "Reperto API"});

log.level('debug');

mongoose.connect('mongodb://localhost/reperto', { useMongoClient: true });
mongoose.Promise = global.Promise;

// CRUD

exports.list = (req, res, next) => {
  log.debug('Variants LIST');
  Variant.find({})
    .exec((err, variants) => {

    if (err) next(err);
    res.status(200).send(variants);
  });
}

exports.create = (req, res, next) => {
  log.debug('Variants CREATE', req.body);
  let newVariant = new Variant({
    name: req.body.name,
    nodes: req.body.nodes,
    color: req.body.color,
    tabia: req.body.tabia
  });
  newVariant.markModified('nodes');
  newVariant.save((err, variant) => {

    if (err) next(err);
    res.status(200).send(variant);
  });
}

exports.get = (req, res, next) => {
  log.debug('Variants GET', req.params, req.body);
  Variant.findOne({'_id': req.params.id})
    .exec((err, variant) => {

    if (err) next(err);
    res.status(200).send(variant);
  });
}

exports.update = (req, res, next) => {
  log.debug('Variants UPDATE', req.params, req.body);
  Variant.update({'_id': req.params.id}, req.body)
    .exec((err, variant) => {

    if (err) next(err);
    res.status(200).send(variant);
  });
}

exports.delete = (req, res, next) => {
  log.debug('Variants DELETE', req.params, req.body);
  Variant.remove({'_id': req.params.id}, err => {

    if (err) next(err);
    res.status(200).send({});
  });
}

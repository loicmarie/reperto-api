const mongoose = require('mongoose');
const Variant = require('../model/Variant');
const Repertoire = require('../model/Repertoire');
const ObjectId = mongoose.Types.ObjectId;
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "Reperto API"});

log.level('debug');

mongoose.connect('mongodb://db/reperto', { useMongoClient: true });
mongoose.Promise = global.Promise;

// CRUD

exports.list = (req, res, next) => {
  log.debug('Repertoires LIST');
  Repertoire.find({})
    .populate('variants')
    .exec((err, repertoires) => {

    if (err) next(err);
    res.status(200).send(repertoires);
  });
}

exports.create = (req, res, next) => {
  log.debug('Repertoires CREATE', req.body);
  let newRepertoire = new Repertoire({
    name: req.body.name,
    color: req.body.color,
    variants: req.body.variants
  });
  newRepertoire.save((err, repertoire) => {
    if (err) next(err);
    Repertoire.populate(repertoire, {path: 'variants'}, (err, repertoire) => {

      if (err) next(err);
      res.status(200).send(repertoire);
    });
  });
}

exports.get = (req, res, next) => {
  log.debug('Repertoires GET', req.params);
  Repertoire.findOne({'_id': req.params.id})
    .populate('variants')
    .exec((err, repertoire) => {

    if (err) next(err);
    res.status(200).send(repertoire);
  });
}

exports.update = (req, res, next) => {
  log.debug('Repertoires UPDATE', req.params, req.body);
  Repertoire.update({'_id': req.params.id}, req.body)
    .exec((err, repertoire) => {

    if (err) next(err);
    res.status(200).send(repertoire);
  });
}

exports.delete = (req, res, next) => {
  log.debug('Repertoires DELETE', req.params);
  Repertoire.remove({'_id': req.params.id}, err => {

    if (err) next(err);
    res.status(200).send({});
  });
}

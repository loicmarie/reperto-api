const mongoose = require('mongoose');
const Variant = require('../model/Variant');
const User = require('../model/User');
const ObjectId = mongoose.Types.ObjectId;
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "Reperto API"});

log.level('debug');

mongoose.connect('mongodb://localhost/reperto', { useMongoClient: true });
mongoose.Promise = global.Promise;

// CRUD

exports.list = (req, res, next) => {
  log.debug('Users LIST');
  User.find({})
    .populate('variants')
    .exec((err, users) => {

    if (err) next(err);
    res.status(200).send(users);
  });
}

exports.create = (req, res, next) => {
  log.debug('Users CREATE', req.body);
  let newUser = new User({
    name: req.body.name,
    nickname: req.body.nickname,
    userId: req.body.userId
  });
  newUser.save((err, user) => {
    if (err) next(err);
    User.populate(user, {path: 'variants'}, (err, user) => {

      if (err) next(err);
      res.status(200).send(user);
    });
  });
}

exports.get = (req, res, next) => {
  log.debug('Users GET', req.params);
  User.findOne({'_id': req.params.id})
    .populate('variants')
    .exec((err, user) => {

    if (err) next(err);
    res.status(200).send(user);
  });
}

exports.update = (req, res, next) => {
  log.debug('Users UPDATE', req.params, req.body);
  User.update({'_id': req.params.id}, req.body)
    .exec((err, user) => {

    if (err) next(err);
    res.status(200).send(user);
  });
}

exports.delete = (req, res, next) => {
  log.debug('Users DELETE', req.params);
  User.remove({'_id': req.params.id}, err => {

    if (err) next(err);
    res.status(200).send({});
  });
}

// UTILS

exports.getFromUserId = (req, res, next) => {
  log.debug('Users GETfromUID', req.params);
  User.findOne({'userId': req.params.id})
    .populate('variants')
    .exec((err, user) => {

    if (err) next(err);
    res.status(200).send(user);
  });
}

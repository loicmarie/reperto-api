const mongoose = require('mongoose');
const Variant = require('../model/Variant');
const User = require('../model/User');
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect('mongodb://localhost/reperto', { useMongoClient: true });
mongoose.Promise = global.Promise;

// CRUD

exports.list = (req, res, next) => {
    User.find({})
        .populate('variants')
        .exec((err, users) => {

        if (err) next(err);
        res.send(users);
        next();
    });
}

exports.create = (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        nickname: req.body.nickname,
        userId: req.body.userId
    });
    newUser.save((err, user) => {
        if (err) next(err);
        User.populate(user, {path: 'variants'}, (err, user) => {

            if (err) next(err);
            console.log('CREATE', user);
            res.send(user);
            next();
        });
    });
}

exports.get = (req, res, next) => {
    User.findOne({'_id': req.params.id})
        .populate('variants')
        .exec((err, user) => {

        if (err) next(err);
        console.log('GET', user);
        res.send(user);
        next();
    });
}

exports.update = (req, res, next) => {
    User.update({'_id': req.params.id}, req.body)
        .exec((err, user) => {

        if (err) next(err);
        res.send(200);
        next();
    });
}

exports.delete = (req, res, next) => {
    User.remove({'_id': req.params.id}, err => {

        if (err) next(err);
        res.send(200);
        next();
    });
}

// UTILS

exports.getFromUserId = (req, res, next) => {
    User.findOne({'userId': req.params.id})
        .populate('variants')
        .exec((err, user) => {

        if (err) next(err);
        res.send(user);
        next();
    });
}

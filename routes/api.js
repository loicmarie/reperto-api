const routes = require('express').Router();
const users = require('../controller/users');
const variants = require('../controller/variants');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

// Users CRUD
routes.get('/users', users.list);
routes.post('/users', users.create);
routes.get('/users/:id', users.get);
routes.post('/users/:id', users.update);
routes.delete('/users/:id', users.delete);
// Users Utils
routes.get('/users/uid/:id', users.getFromUserId);

// Variants CRUD
routes.get('/variants', variants.list);
routes.post('/variants', variants.create);
routes.get('/variants/:id', variants.get);
routes.post('/variants/:id', variants.update);
routes.delete('/variants/:id', variants.delete);

module.exports = routes;

const routes = require('express').Router();

routes.get('*', (req, res) => {
  res.redirect('/index.html');
})

module.exports = routes;

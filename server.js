const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "Reperto API"});

let port = process.env.REPERTO_API_PORT || 3000;
let routes = {
  api: require('./routes/api'),
  web: require('./routes/web')
};


log.level('debug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../front/dist/'));
app.use('/api', routes.api);

app.get('*', (req, res, next) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {
  log.info('Listening on port', port);
});

// let restify = require('restify');
// let fs = require('fs');
//
// let users = require('./controller/users');
// let variants = require('./controller/variants');
// let pgn = require('./controller/pgn');
//
// let server = restify.createServer();
// server.use(restify.plugins.bodyParser());
//
// // Users CRUD
// server.get('/users', users.list);
// server.post('/users', users.create);
// server.get('/users/:id', users.get);
// server.post('/users/:id', users.update);
// server.del('/users/:id', users.delete);
// // Users Utils
// server.get('/users/uid/:id', users.getFromUserId);
//
// // Variants CRUD
// server.get('/variants', variants.list);
// server.post('/variants', variants.create);
// server.get('/variants/:id', variants.get);
// server.post('/variants/:id', variants.update);
// server.del('/variants/:id', variants.delete);
//
// server.post('/pgn/tojson', pgn.toJSON);
//
//
// let serveIndex = (req, res, next) => {
//   console.log(req, res, next);
//   fs.readFile(__dirname + '/index.html', (err, data) => {
//     if (err) {
//       next(err);
//       return;
//     }
//
//     res.setHeader('Content-Type', 'text/html');
//     res.writeHead(200);
//     res.end(data);
//     next();
//   });
//
// }
//
// // server.get('/', serveIndex);
//
// server.on('NotFound', serveIndex);
//
// server.listen(8080, function() {
//   console.log('%s listening at %s', server.name, server.url);
// });

let restify = require('restify');

let users = require('./controller/users');
let variants = require('./controller/variants');
let pgn = require('./controller/pgn');

let server = restify.createServer();
server.use(restify.plugins.bodyParser());

// Users CRUD
server.get('/users', users.list);
server.post('/users', users.create);
server.get('/users/:id', users.get);
server.post('/users/:id', users.update);
server.del('/users/:id', users.delete);
// Users Utils
server.get('/users/uid/:id', users.getFromUserId);

// Variants CRUD
server.get('/variants', variants.list);
server.post('/variants', variants.create);
server.get('/variants/:id', variants.get);
server.post('/variants/:id', variants.update);
server.del('/variants/:id', variants.delete);

server.post('/pgn/tojson', pgn.toJSON);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

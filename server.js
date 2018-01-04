const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
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
app.use('/api', routes.api);

if (process.env.REPERTO_ENV == 'prod') {
  app.use(express.static('../front/dist/'));
  app.get('*', (req, res, next) => {
    res.sendFile('/front/dist/index.html', { root: path.join( __dirname, '../') });
  });
}

app.listen(port, () => {
  log.info('Listening on port', port);
});

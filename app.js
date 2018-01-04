const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.set('view engine', 'twig');

app.use(urlencodedParser);
app.use('/assets', express.static('public'))
app.use('/', routes);

app.listen(PORT);

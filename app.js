const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(urlencodedParser);
app.set('view engine', 'twig');

app.listen(PORT);
 
app.use('/', routes);
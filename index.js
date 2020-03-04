const express = require('express');

const config = require('./config');
const routes = require('./routes');
const listen = require('./listen');

const app = express();
config(app);
routes(app);
listen(app);

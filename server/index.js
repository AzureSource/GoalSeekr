require('dotenv').config();
const path = require('path');
const routes = require('./routes');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/', routes);

const PORT = 7777;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
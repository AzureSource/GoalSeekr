require('dotenv').config();
const path = require('path');
const routes = require('./routes');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/', routes);



const PORT = process.env.PORT || 7777;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
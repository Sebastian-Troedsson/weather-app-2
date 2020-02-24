const express = require('express');
const server = express();
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

server.use(cors());
server.use('/api', routes);

server.listen(process.env.PORT, console.log(`Listening on ${process.env.HOST}:${process.env.PORT}`));
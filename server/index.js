require('dotenv').config();
const path = require('path');
const express = require('express');
const http = require('http');

// Constants
const port = process.env.PORT || 6969;

class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.setup();
    this.start();
  }
  setup() {
    this.app.use((_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });
    this.app.use('/', express.static(path.join(__dirname, '..')));
    this.app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, '..', 'index.html'));
    });
  }
  start() {
    this.server.listen(port, '0.0.0.0', () => {
      console.log(`Start Backend at Port ${port}`);
    });
  }
}

new Server();

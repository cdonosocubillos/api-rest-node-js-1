const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');

const app = express();

//conexion a mongo
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost:27018/store-api',
    {
        userNewUrlParser: true,
    },
    () => console.log("\x1b[35m","  Base de datos conectada")
);

//habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//habilitar cors
app.use(cors());

app.use('/', routes());

app.use(express.static('uploads'));//carpeta expuesta en nuestro servidor para acceder a los uploads.

const server = http.createServer(app);

server.listen(5002, function listening() {
    console.log('Listening on %d', server.address().port);
  });

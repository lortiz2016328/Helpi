// IMPORTACIONES
const express = require('express');
const cors = require('cors');
var app = express();

// IMPORTACIONES RUTAS
const UsuariosRutas = require('./src/routes/usuarios.routes');
// MIDDLEWARES -> INTERMEDIARIOS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

app.use('/api', UsuariosRutas);


module.exports = app;
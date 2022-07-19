const express = require('express');
const usuariosControlador = require('../controllers/usuarios.controller');

const api = express.Router();

api.post('/login', usuariosControlador.Login);
api.post('/registrarUsuario', usuariosControlador.agregarUsuario);
api.put('/editarUsuario/:idUsuario', usuariosControlador.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario',usuariosControlador.eliminarUsuario);
api.get('/buscarUsuario',usuariosControlador.buscarUsuario);

module.exports = api;
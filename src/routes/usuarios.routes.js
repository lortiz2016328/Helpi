const express = require('express');
const usuariosControlador = require('../controllers/usuarios.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/login', usuariosControlador.Login);
api.post('/registrarUsuario', usuariosControlador.agregarUsuario);
api.put('/editarUsuario/:idUsuario', usuariosControlador.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario',usuariosControlador.eliminarUsuario);
api.get('/buscarUsuario',usuariosControlador.buscarUsuario);
api.put('/reservarServicio/:idServicio', md_autenticacion.Auth, usuariosControlador.reservacionServicio);

module.exports = api;
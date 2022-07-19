const express = require('express');
const modeloServicio = require('../controllers/servicio.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/agregarServicio', md_autenticacion.Auth, modeloServicio.agregarServicio);
api.put ('/editarServicio/:idServicio', modeloServicio.editarServicio);
api.delete('/eliminarServicio/:idServicio',  modeloServicio.eliminarServicio);
api.get('/buscarServicios', md_autenticacion.Auth, modeloServicio.buscarServicios);
api.get('/buscarServicioNombre/:nombreServicio', md_autenticacion.Auth, modeloServicio.buscarServicioNombre);
api.get('/servicios', md_autenticacion.Auth, modeloServicio.obtenerServicios);
api.get('/servicios/:idServicio',  modeloServicio.ObtenerServiciosId);

module.exports = api;
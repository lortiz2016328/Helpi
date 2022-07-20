const Servicio = require('../models/servicios.model');                                                  
const underscore = require('underscore');

function agregarServicio(req, res) {
    var parametros = req.body;
    var servicioModel = new Servicio;

    if (parametros.nombreServicio, parametros.precio, parametros.descripcion) {
        Servicio.findOne({ nombreServicio: parametros.nombreServicio }, (err, servicioEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" })
            if (underscore.isEmpty(servicioEncontrado)) {

                    if (err) return res.status(500).send({ mensaje: "Error en la peticion" + err})
                        servicioModel.nombreServicio = parametros.nombreServicio;
                        servicioModel.precio = parametros.precio;
                        servicioModel.descripcion = parametros.descripcion;
                        servicioModel.idAdmin=req.user.sub;
                        servicioModel.save((err, servicioGuardado) => {
                            if (err) return res.status(404).send({ mensaje: 'Error en la peticion' })
                            return res.status(200).send({ mensaje: servicioGuardado })
                        })
                    
            } else {
                return res.status(500).send({ mensaje: "el servicio ya existe" })
            }
        })
    } else {
        return res.status(500).send({ mensaje: "Por favor, llene todos los campos" })
    }
}

function editarServicio(req, res){
    var parametros = req.body;
    var idServicio = req.params.idServicio;

    Servicio.findByIdAndUpdate(idServicio, parametros,{new : true}, (err, servicioEditado)=>{

        if (err) return res.status(500).send({mensaje: "Error en la peticion"});
        if (!servicioEditado) return res.status(500).send({mensaje: "El servicio no existe, intenta de nuevo"});

        if (servicioEditado) return res.status(200).send({Servicios: servicioEditado});
    })
}

function eliminarServicio(req,res){
    var idServicio = req.params.idServicio;

    Servicio.findByIdAndDelete(idServicio, (err, servicioEliminado)=>{
        if (err) return res.status(404).send({mensaje: "Error en la peticion"});
        if(!servicioEliminado) return res.status(404).send({mensaje: "El servicio no existe, intenta de nuevo"});

        if(servicioEliminado) return res.status(200).send({Servicios: servicioEliminado});
    })
}

function buscarServicios(req, res) {
    Servicio.find({idAdmin: req.user.sub},(err, serviciosEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!serviciosEncontrados) return res.status(404).send({ mensaje: 'Error al encotrar los servicios' });

        return res.status(200).send({Servicios: serviciosEncontrados });
    })
}

function buscarServicioNombre(req, res){
    var nombreService = req.params.nombreServicio;

    Servicio.findOne( { nombre : { $regex: nombreService, $options: 'i' }}, (err, servicioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!servicioEncontrado) return res.status(404).send({ mensaje: "Error al encotrar el servicio" });

        return res.status(200).send({ Servicio: servicioEncontrado });
    })
}


function obtenerServicios (req, res) {
    if (req.user.rol == "SuperAdmin" || req.user.rol == "Cliente") {
        Servicio.find((err, serviciosEncontrados) => {
            if (err) return res.send({ mensaje: "Error: " + err })
            for (let i = 0; i < serviciosEncontrados.length; i++) {
            }
            return res.status(200).send({ servicios: serviciosEncontrados })
        })
    }else{
        Servicio.find({idAdmin: req.user.sub},(err, serviciosEncontrados) => {
            if (err) return res.send({ mensaje: "Error: " + err })
    
            return res.send({ servicios: serviciosEncontrados })
    
        })
    }
}

function ObtenerServiciosId(req, res) {
    var idService = req.params.idServicio;

    Servicio.findById(idService, (err, serviciosEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!serviciosEncontrado) return res.status(500).send( { mensaje: 'Error al obtener los datos' });

        return res.status(200).send({ servicio: serviciosEncontrado });
    })
}



module.exports={
    agregarServicio,
    editarServicio,
    eliminarServicio,
    buscarServicios,
    buscarServicioNombre,
    ObtenerServiciosId,
    obtenerServicios
}
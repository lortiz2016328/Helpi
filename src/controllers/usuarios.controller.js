const Usuario = require('../models/usuarios.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')

function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ email: parametros.email }, (err, empresaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la petición" });
        if (empresaEncontrada) {
            
            bcrypt.compare(parametros.password, empresaEncontrada.password,
                (err, verificacionPassword) => {
                      
                    if (verificacionPassword) {
                            
                        if (parametros.obtenerToken === 'true') {
                            return res.status(200)
                                .send({ token: jwt.crearToken(empresaEncontrada) })
                        } else {
                            empresaEncontrada.password = undefined;
                            return res.status(200)
                                .send({ empresa: empresaEncontrada })
                        }
                    } else {
                        return res.status(500)
                            .send({ mensaje: "La contraseña no coincide, intente de nuevo" });
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: "El correo no existe, intente de nuevo" })
        }
    })
}

function agregarUsuario(req, res) {
    var parametros = req.body;
    var usuarioModelo = new Usuario();

    if (parametros.nombre && parametros.email && parametros.password) {
        usuarioModelo.nombre = parametros.nombre;
        usuarioModelo.email = parametros.email;
        usuarioModelo.password = parametros.password;
        usuarioModelo.rol = 'Usuarios';

        Usuario.find({ email: parametros.email }, (err, clienteRegistrado) => {
            if (clienteRegistrado.length == 0) {
                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    usuarioModelo.password = passwordEncriptada;
                    usuarioModelo.save((err, clienteGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la petición' });
                        if (!clienteGuardado) return res.status(404).send({ mensaje: 'No se agrego al usuario, intente de nuevo' });
                        return res.status(201).send({ usuarios: clienteGuardado });
                    })

                })
            } else {
                return res.status(500).send({ mensaje: 'Este correo ya existe, intente de nuevo' });
            }

        })
    }

}

function editarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    var parametros = req.body;
    Usuario.findByIdAndUpdate(idUsuario, parametros, { new: true }, (err, usuarioActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioActualizado) return res.status(404).send({ mensaje: 'Error al editar el usuario' });
        return res.status(200).send({ usuario: usuarioActualizado })
    })

}

function eliminarUsuario(req, res) {
    var id = req.params.idUsuario;
    Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioEliminado) return res.status(404).send({ mensaje: 'Error al eliminar el usuario' });
        return res.status(200).send({ usuario: usuarioEliminado })
    })

}

function buscarUsuario(req, res) {
    Usuario.find((err, usuarioEncontrado) => {
        if (err) return res.send({ mensaje: "Error: " + err })
        for (let i = 0; i < usuarioEncontrado.length; i++) {

        }
        return res.status(200).send({ usuario: usuarioEncontrado })
    })
}

module.exports = {
    Login,
    agregarUsuario,
    editarUsuario,
    eliminarUsuario,
    buscarUsuario
}
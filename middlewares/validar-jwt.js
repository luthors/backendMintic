const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );
        const usuario1= await Usuario.findById( req.params.id );
        console.log(req.params.id)
        if( !usuario1 ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }
        

        // Verificar si el uid tiene estado true
        if ( !usuario1.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        
        
        req.usuario = usuario1;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}
const { response } = require('express');
const { validationResult } = require('express-validator');


const validarCampos = ( req, res=response, next ) => {
    console.log("Bodyy ",req.body)
    const errors = validationResult(req);


    if( !errors.isEmpty() ){
        console.log("eee1", errors)
        return res.status(400).json(errors);
        
    }

    next();
}



module.exports = {
    validarCampos
}

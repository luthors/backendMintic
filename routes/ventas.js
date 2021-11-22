const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearVenta,
        obtenerVentas,
        obtenerVenta,
        actualizarVenta, 
        borrarVenta } = require('../controllers/ventas');

const {existeVentaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico

router.get('/', obtenerVentas);

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeVentaPorId ),
    validarCampos,
], obtenerVenta );


// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    // check('numero','El numero es obligatorio').not().isEmpty(),
    check('cliente','El nombre cliente es obligatorio').not().isEmpty(),
    check('fecha','La fecha es obligatorio').not().isEmpty(),
    check('total','El total es obligatorio').not().isEmpty(),
    check('producto','No es un mongo ID valido').isMongoId(),
    // check('numero').custom( existeVentaPorId ),
    validarCampos
], crearVenta );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('producto','No es un mongo ID valido').isMongoId(),
    check('id').custom( existeVentaPorId ),
    validarCampos
], actualizarVenta );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeVentaPorId ),
    validarCampos,
], borrarVenta);


module.exports = router;
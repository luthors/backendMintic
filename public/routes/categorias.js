const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', (req, res)=>{
    console.log("todo bien")
})

module.exports = router;
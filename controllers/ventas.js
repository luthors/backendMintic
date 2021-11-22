const { response } = require('express');
const { Venta } = require('../models');



const obtenerVentas = async(req, res = response ) => {
    console.log("linea 7 venta controller")
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, ventas ] = await Promise.all([
        Venta.countDocuments(query),
        Venta.find(query)
            .populate('producto', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        ventas
    });
}

const obtenerVenta = async(req, res = response ) => {

    const { id } = req.params;
    const venta = await Venta.findById( id )
                            .populate('producto', 'nombre');

    res.json( venta );

}

const crearVenta = async(req, res = response ) => {


    const { numero, estado, usuario, ...body } = req.body;
    console.log("linea 39 controlles: ",numero)
    const ventaDB = await Venta.findOne({ numero });
    console.log("eee:",req.body)


    
    if ( ventaDB ) {
        return res.status(400).json({
            msg: `La venta ${ ventaDB.numero }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {

        ...body,
        numero:req.body.numero

    }

    const venta = new Venta( data );
    console.log("venta",  venta)
    // Guardar DB

    await venta.save();


    res.status(201).json(venta);

}

const actualizarVenta = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const venta = await Venta.findByIdAndUpdate(id, data, { new: true });

    res.json( venta );

}

const borrarVenta = async(req, res =response ) => {

    const { id } = req.params;
    const ventaBorrada = await Venta.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( ventaBorrada );
}




module.exports = {
    crearVenta,
    obtenerVentas,
    obtenerVenta,
    actualizarVenta,
    borrarVenta
}
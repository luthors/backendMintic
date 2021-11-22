
const { Schema, model } = require('mongoose');

const ventaSchema = new Schema({
  
    numero: {
        type: String,
        // required: [true, 'El numero de la factura es obligatorio']
    },
    cliente: {
        type: String,
        required: [true, 'El nombre del cliente es obligatorio'],
        unique: false
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria'],
    },
    total: {
        type: String,
        required: [true, 'El total es obligatorio'],
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
    },

    estado: {
        type: Boolean,
        default: true
    },
    
});


ventaSchema.methods.toJSON = function() {
    const { __v, estado, ...venta  } = this.toObject();
    return venta;
}


module.exports = model( 'Venta', ventaSchema );

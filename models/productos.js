import mongoose from 'mongoose'


const productoSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: true,
        unique: true
    },

    estado:{
        type: Boolean,
        default: true,
        required: true
    },

    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio:{
        type: Number,
        default: 0
    },

    categoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {type: String},
    disponible: {type: Boolean, default: true}
})


const Producto = mongoose.model("Producto", productoSchema)

export default Producto 
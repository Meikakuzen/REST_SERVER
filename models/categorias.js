import mongoose from 'mongoose'

const categoriaSchema = mongoose.Schema({
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
    }
})

const Categoria = mongoose.model("Categoria", categoriaSchema)

export default Categoria
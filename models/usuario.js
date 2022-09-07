
import mongoose from 'mongoose'


const UsuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true,"El nombre es obligatorio"]
    },
    mail:{
        type: String,
        required: [true,"El email es obligatorio"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"La contraseña es obligatorio"],
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true,
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const {__v, password,_id,...usuario}= this.toObject() //this.toObject hace del Schema un o bjeto literal de JS
    usuario.uid= _id
    return usuario
}   


const Usuario = mongoose.model("Usuario", UsuarioSchema)

export default Usuario



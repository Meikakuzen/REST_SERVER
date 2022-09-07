import Role from '../models/role.js'
import Usuario from '../models/usuario.js'


const esRolValido =async(rol=" ")=>{

    const existeRol= await Role.findOne(rol)

    if(!existeRol){
        throw new Error('El rol no está registrado en la DB')
    }
}

 const emailExiste = async(mail="")=>{
    const mailExiste = await Usuario.findOne(mail)

    if(mailExiste){
        throw new Error('El email ya existe')
    }
 }

 const existeUsuarioPorId = async (id)=>{
    
    const existeUsuario = await Usuario.findById(id)

    if(!existeUsuario){
        throw new Error("El id no existe")
    }
 }





export{
    esRolValido,
    emailExiste,
    
}
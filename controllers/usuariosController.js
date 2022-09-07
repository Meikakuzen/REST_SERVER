import Usuario from '../models/usuario.js'
import bcryptjs from 'bcryptjs'
import Role from '../models/role.js';
import { googleVerify } from '../helpers/google-verify.js';
import generarJWT from '../helpers/generarJWT.js';
import mongoose from 'mongoose'


const usuariosGet= async(req,res)=>{
    try {

        const {limite=5, desde = 0} = req.query

        const query = {estado: true}//filtro para el estado simulando usuarios activos
        
        const [usuarios, total] = await Promise.all([
           
            Usuario.find(query) 
                .skip(desde)
                .limit(limite),
            Usuario.countDocuments(query)

         ])
         
        res.json({usuarios, total})



    } catch (error) {
        console.log(error)
    }
    
    

}

const usuariosPut = async(req,res)=>{
    const {id} = req.params
    const {password,google, mail, ...resto} = req.body
    
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    const usuarioExiste = await Usuario.findById(id)

    if(!usuarioExiste){
        return res.status(400).json({msg: "El usuario no existe"})
    }

    if(password){

        const salt = bcryptjs.genSaltSync(10)
        usuario.password= bcryptjs.hashSync(password, salt)   
    }

 

    await usuario.save()
    res.json({msg: "Usuario actualizado correctamente"})
}

const usuariosPost=async(req,res)=>{
    const {nombre, mail, password, rol} = req.body
    
    const usuario= new Usuario({nombre, mail, password, rol})

    const existeUsuario = await Usuario.findOne({mail})

    if(existeUsuario){
       return res.status(400).json({msg: "Ese correo ya existe"})
    }

    if(password === ""|| password < 6){
        return res.status(400).json({msg: "El password es obligatorio y debe ser de al menos 6 caracteres"})
    }

    if(nombre === "" || nombre < 3){
        return res.status(400).json({msg:"El nombre es obligatorio"})
    }

    const existeRol = await Role.findOne({rol})
    
    if(!existeRol){
         return res.status(400).json({msg: "No existe ese rol"})
    }

   const salt = bcryptjs.genSaltSync(10)
   usuario.password= bcryptjs.hashSync(password, salt)
    

    await usuario.save()

    res.json({msg: "Usuario almacenado correctamente!"})
}



const usuariosDelete=async(req,res)=>{
    
    const {id} = req.params

    
    //const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    
    //const usuarioAutenticado = req.usuario; //Aqui está la info del usuario autenticado

    

    res.json({usuario})

}

const googleSignIn = async(req, res)=>{
    const {id_token} = req.body
    
    
    
    try {
        const googleUser = await googleVerify(id_token)

        const {nombre, img, mail} = googleUser;

        let usuario = await Usuario.findOne({mail})
        

        if(!usuario){
           
            const data = {
                nombre,
                mail,
                password: 'password',
                img,
                google: true,
                rol:"ADMIN_ROLE"

            }
            usuario = new Usuario(data)

        
        
            await usuario.save()
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: "Hable con el administrador. Usuario bloqueado"
            })
        }

        const token = await generarJWT(usuario.id)
        
        
        
            res.json({
                msg: "Todo ok! Google Sign in",
                usuario,
                token
            })
        
    } catch (error) {
        res.status(400).json({
            msg: "El token de google no se pudo verificar"
        }) 
    }

}


export {
    usuariosGet,
    usuariosPut,
    usuariosDelete,
    usuariosPost,
    googleSignIn
}
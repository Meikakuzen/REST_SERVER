import {response, request} from 'express'
import jwt from 'jsonwebtoken'
import Usuario from '../models/usuario.js';



const validarJWT = async (req= request,res= response,next)=>{

    const token = req.header('x-token');

    

    if(!token){
        return res.status(401).json({msg: "No hay token en la petición"})
    }

    try {
        const {uid} = jwt.verify( token, process.env.SECRET_KEY )
    
        const usuario = await Usuario.findById(uid)

        if(!usuario){
            return res.status(400).json({msg: "El usuario no existe"})
        }

        if(!usuario.estado){
            return res.status(401).json({msg: "El usuario está eliminado"})
        }

        req.usuario = usuario //guardo el usuario en el request para disponer de la información llegue al siguiente middleware

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({msg: 'Token no válido'})        
    }



}



export default validarJWT
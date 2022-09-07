import Usuario from "../models/usuario.js"
import bcryptjs from 'bcryptjs'
import generarJWT from "../helpers/generarJWT.js"



const login = async(req,res)=>{
   
    const {mail, password} = req.body

    try {
        
        if(mail ==="" || password===""){
            return res.status(400).json({msg: "Los campos son obligatorios"})
        }
    
        if(password.length < 6){
            return res.status(400).json({msg: "El password debe tener almenos 6 caracteres"})
        }

        const emailExiste = await Usuario.findOne({mail})
        if(!emailExiste){
            return res.status(400).json({msg: "El email no existe"})
        }

        const usuario = await Usuario.findOne({mail})

        if(!usuario.estado){
            return res.status(400).json({msg: "El usuario no está activo"})
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password)

        if(!validPassword){
            return res.status(400).json({ msg: "Password no válido"})
        }

        //generar JWT
        const token = await generarJWT(usuario.id)
    
        res.json({usuario, token})
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Algo salió mal"})
    }
}



export{
    
    login
    
}
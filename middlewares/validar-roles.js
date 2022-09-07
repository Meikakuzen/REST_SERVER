

const esAdminRole = (req, res, next)=>{

    if(!req.usuario){
        return res.status(500).json({msg: "Se quiere verificar el rol sin validar el token primero"})
    }

    const {rol, nombre} = req.usuario//este usaurio viene del middleware de comprobar JWT

    if(rol !== "ADMIN_ROLE"){
        return res.status(401).json({msg: "No está autorizado para hacer esta acción, no es administrador"})
    }

    next()
}

const tieneRole = (...roles)=>{

    return (req,res,next)=>{
        if(!req.usuario){
            return res.status(500).json({msg: "Se quiere verificar el rol sin validar el token primero"})
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({msg: `El servicio requiere de uno de estos roles ${roles}`})
        }

        next()
    }
}

export default esAdminRole

export{
    tieneRole
}
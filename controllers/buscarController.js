
import Usuario from '../models/usuario.js'
import Categoria from '../models/categorias.js'
import Productos from '../models/productos.js'
import mongoose from 'mongoose'

const coleccionesPermitidas =[
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async(termino="", res="")=>{
    const esMongoId = mongoose.isValidObjectId( termino )

    if(esMongoId){
        const usuario = await Usuario.findById(termino)
      return  res.json({
            results: usuario ? [usuario]: []
        })
    }

    const regex = new RegExp( termino, 'i') //expresión regular para ser case insensitive


    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo:regex}], //$or de mongo para manejar opicones
        $and: [{estado: true}] //$and de mongo
    })




    res.json({
        results: usuarios
    })
}

const buscarCategorias = async(termino="", res="")=>{
    
    const esMongoId = mongoose.isValidObjectId( termino )

    if(esMongoId){
        const categoria = await Categoria.findById(termino)
      return  res.json({
            results: categoria ? [categoria]: []
        })
    }

    const regex = new RegExp( termino, 'i') //expresión regular para ser case insensitive


    const categorias = await Categoria.find({nombre: regex, estado: true})
    res.json({
        results: categorias
    })


}


const buscarProductos = async(termino="", res="")=>{
    
    const esMongoId = mongoose.isValidObjectId( termino )

    if(esMongoId){
        const producto = await Productos.findById(termino).populate('categoria', 'nombre')
      return  res.json({
            results: producto ? [producto]: []
        })
    }

    const regex = new RegExp( termino, 'i') //expresión regular para ser case insensitive


    const productos = await Productos.find({nombre: regex, estado: true}).populate('categoria', 'nombre')
    res.json(productos)


}

const buscar = (req, res)=>{

    const {coleccion, termino} = req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res)
            break;
        case 'categorias':
            buscarCategorias(termino, res)
            break;

        case 'productos':
            buscarProductos(termino, res)
        break;
    
        default:
            res.status(500).json({msg: "Se me olvidó hacer esta busqueda"})
            break;
    }
 
}



export {
    buscar
}
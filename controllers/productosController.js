import Producto from '../models/productos.js'
import Categoria from '../models/categorias.js'

const obtenerProductos = async (req,res)=>{

    const{limit=5, desde=0}= req.query

    const query = {estado: true}

    const [total,productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
            .skip(parseInt(desde))
            .limit(parseInt(limit))
    ])
    res.json({
        total,
        productos
    })


    res.json({msg: "GET correcto"})
}

const obtenerProducto = async (req,res)=>{
    const {id} = req.params

    const producto = await Producto.findById(id)
                                    .populate('usuario', 'nombre')
                                    .populate('categoria', 'nombre')

    res.json(producto)
}


const nuevoProducto = async (req,res)=>{

    const {estado, usuario, ...body} = req.body

    const existeProducto = await Producto.findOne({nombre: req.body.nombre})

    if(existeProducto){
        return res.status(400).json({msg: "El producto ya existe"})
    }

    
    const data ={
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,

    }

    const producto = new Producto(data)
     await producto.save()
    

    res.json({msg: "Producto almacenado correctamente"})
}

const editarProducto = async(req,res)=>{
    const {id} = req.params
    const {estado, usuario, ...data} = req.body

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase()
    }

    data.usuario = req.usuario._id

    const producto = await Producto.findByIdAndUpdate(id, data)

    
    res.json({msg: "Usuario editado correctamente"})

}

const borrarProducto =async (req,res)=>{
    const {id} = req.params

    const producto= await Producto.findByIdAndUpdate(id, {estado: false})



    res.json({msg: "Producto borrado correctamente"})
}

export {
    obtenerProductos,
    obtenerProducto,
    editarProducto,
    nuevoProducto,
    borrarProducto
}
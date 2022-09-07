import Categoria from '../models/categorias.js'



const obtenerCategorias = async (req,res)=>{

   const {limite=5, desde= 0} = req.query

   const query = {estado: true}

   const [total, categorias]= await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
        .populate("usuario", "nombre")
        .skip(parseInt(desde))
        .limit(parseInt(limite))
   ])
    
   res.json({
    total,
    categorias
   })
}

const obtenerCategoria = async (req,res)=>{

    const {id} = req.params

    const categoria = await Categoria.findById(id)

    if(!categoria){
        return res.status(400).json({msg: "La categoría no existe, no se puede mostrar"})
    }

    res.json({categoria})
}

const crearCategoria = async (req,res) =>{
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB){
        res.status(400).json({msg: "La categoría ya existe"})
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)
    await categoria.save()

    res.json({msg:"Categoría creada correctamente"})
}

const actualizarCategoria = async(req,res) =>{
    const {id} = req.params
    const {estado, usuario, ...data} = req.body
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate(id,data)
    res.json( categoria)
}


const borrarCategoria = async (req,res) =>{
    const {id} = req.params

    const categoria = await Categoria.findOne({id})

    if(!categoria){
        return res.status(400).json({msg:"La categoría no existe"})
    }

    categoria.estado = false

    await categoria.save()


    res.json({msg: "Categoría borrada correctamente"})
}

export {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}
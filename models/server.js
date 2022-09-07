import express from 'express'
import cors from 'cors'
import router from '../routes/user.routes.js'
import DBConnection from '../config/db.js'
import auth from '../routes/auth.routes.js'
import categorias from '../routes/categorias.routes.js'
import productos from '../routes/productos.routes.js'
import buscar from '../routes/buscar.routes.js'


class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.path = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            buscar: '/api/buscar'
        }

        //this.conectarDB()
        
        //Middlewares
        this.middlewares()        
        //Rutas
        this.routes()
        
    }

    middlewares (){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }
    async conectarDB(){
        await DBConnection()
    }

    routes(){
        this.app.use(this.path.usuarios, router )
        this.app.use(this.path.auth, auth)
        this.app.use(this.path.categorias, categorias)
        this.app.use(this.path.productos, productos)
        this.app.use(this.path.buscar, buscar)
    }
    

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }


}

export default Server
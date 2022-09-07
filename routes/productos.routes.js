import {Router} from 'express'
import { obtenerProductos, obtenerProducto, nuevoProducto, editarProducto, borrarProducto } from '../controllers/productosController.js'
import validarJWT from '../middlewares/validar-jwt.js'
const router = Router()

router.get('/', obtenerProductos)
router.get('/:id', obtenerProducto)
router.post('/', validarJWT, nuevoProducto)
router.put('/:id', validarJWT, editarProducto)
router.delete('/:id', validarJWT, borrarProducto)






export default router
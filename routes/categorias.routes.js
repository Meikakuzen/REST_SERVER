import {Router} from 'express'
import {obtenerCategorias, obtenerCategoria, crearCategoria,actualizarCategoria, borrarCategoria} from '../controllers/categoriasController.js'
import validarJWT from '../middlewares/validar-jwt.js'

const router = Router()


router.get('/', obtenerCategorias)

router.get('/:id', obtenerCategoria)

router.post('/', validarJWT, crearCategoria)

//privado
router.put('/:id', validarJWT, actualizarCategoria)

//admin-role
router.delete('/:id', validarJWT, borrarCategoria)

export default router
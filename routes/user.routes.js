import {Router} from 'express'
import{usuariosGet, usuariosPut, usuariosDelete, usuariosPost} from '../controllers/usuariosController.js'
import validarJWT from '../middlewares/validar-jwt.js'
import esAdminRole from '../middlewares/validar-roles.js'
import {tieneRole} from '../middlewares/validar-roles.js'

const router = Router()         


router.get('/',usuariosGet)


router.put('/:id', validarJWT, usuariosPut)

router.post('/', usuariosPost)

router.delete('/:id',
 validarJWT, 
 tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
 //esAdminRole,
 usuariosDelete)

export default router
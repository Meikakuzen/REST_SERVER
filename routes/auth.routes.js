import {Router} from 'express'
import {login} from '../controllers/authControllers.js'
import { googleSignIn } from '../controllers/usuariosController.js'

const router = Router()


router.post('/login', login)

router.post('/google', googleSignIn )


export default router
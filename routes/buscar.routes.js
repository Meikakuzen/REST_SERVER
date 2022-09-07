import {Router} from 'express'
import { buscar } from '../controllers/buscarController.js'

const router = Router()


router.get('/:coleccion/:termino', buscar)


export default router
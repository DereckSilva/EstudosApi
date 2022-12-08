import express from 'express'
import {user, findAllUser, findUser, updateUser, } from '../controller/userController.js'
import {checaBody, validaErro, checkEmail, checkEmailVal} from '../middleware/cadastroMiddleware.js'
import {verificaID, verificaUser}  from '../middleware/middleware.js'

const router = express.Router()

router.post('/', checkEmail, validaErro, checkEmailVal, checaBody, validaErro, user)
router.get('/user', findAllUser )
router.get('/user/:id', verificaID, verificaUser, findUser)
router.patch('/user/update/:id', verificaID,  verificaUser, updateUser)

export { router }
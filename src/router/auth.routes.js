import express from 'express'
import { userAuth } from '../controller/authController.js'
import {verificaID, verificaUser, verificaSenha}  from '../middleware/middleware.js'

const routerAuth = express.Router()

routerAuth.get('/login', verificaID, verificaUser, verificaSenha, userAuth)

export { routerAuth }
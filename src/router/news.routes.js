import express from 'express'
import { findNews, createNews, topNews, findNew, userNews, updateNew } from '../controller/newsController.js'
import { authMiddleware } from '../middleware/authMidlleware.js'
import { verificaID } from '../middleware/middleware.js'
import { findNewsUser } from '../middleware/newsUserMiddleware.js'

const routerNews = express.Router()

routerNews.post('/', authMiddleware, createNews)
routerNews.get('/', findNews)
routerNews.get('/top', topNews)
routerNews.get('/new/:id',verificaID ,findNew)
routerNews.get('/news/:id', verificaID ,findNewsUser, userNews)
routerNews.patch('/updateNew', verificaID, findNewsUser, updateNew)

export {routerNews}
import express from 'express'
import { findNews, createNews, topNews, findNew } from '../controller/newsController.js'
import { authMiddleware } from '../middleware/authMidlleware.js'
import { verificaID } from '../middleware/middleware.js'

const routerNews = express.Router()

routerNews.post('/', authMiddleware, createNews)
routerNews.get('/', findNews)
routerNews.get('/top', topNews)
routerNews.get('/new/:id',verificaID ,findNew)

export {routerNews}
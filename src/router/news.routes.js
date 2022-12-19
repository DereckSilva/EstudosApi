import express from 'express'
import { findNews, createNews } from '../controller/newsController.js'
import { authMiddleware } from '../middleware/authMidlleware.js'

const routerNews = express.Router()

routerNews.post('/', authMiddleware, createNews)
routerNews.get('/', findNews)

export {routerNews}
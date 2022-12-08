import express from 'express'
import { findNews, createNews } from '../controller/newsController.js'

const routerNews = express.Router()

routerNews.post('/', createNews)
routerNews.get('/', findNews)

export {routerNews}
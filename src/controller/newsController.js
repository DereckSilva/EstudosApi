import { findAllNews, create } from '../services/newsService.js'

export const findNews = async(req, res) => {

    try{
        const news = await findAllNews()
    
        if(news.length == 0) return res.status(500).send({message: 'Not found news'})
    
        return res.status(200).send(news)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const createNews = async(req, res) => {

    try{
        //caught information about authorization bearer token
        const { authorization } = req.headers
        const parts = authorization.split(' ')

        const [schema, token] = parts

        const news = await create(req.body)
    
        if(!news) return res.status(400).send({message: 'invalid content'})
    
        return res.status(201).send(news)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}
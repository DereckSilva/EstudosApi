import { findAllNews, create, countNews } from '../services/newsService.js'

export const findNews = async(req, res) => {

    try{

        let { limit, offset } = req.query 

        limit = Number(limit)
        offset = Number(offset)

        if(!limit) limit = 5
        if(!offset) offset = 0

        const news = await findAllNews(limit, offset)

        const total= await countNews()
        const currentUrl = req.baseUrl

        
        const next = offset + limit
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

        if(news.length == 0) return res.status(500).send({message: 'Not found news'})
    
        return res.status(200).send({
            nextUrl, 
            previousUrl,
            limit,
            offset,
            total,
            results: news.map((newsItem) => {
                return {
                    id: newsItem.id,
                    nome: newsItem.user?.nome,
                    lastname: newsItem.user?.lastname,
                    email: newsItem.user?.email
                }
            })
        })
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const createNews = async(req, res) => {

    try{
        const news = await create(req.body)
    
        if(!news) return res.status(400).send({message: 'invalid content'})
    
        return res.status(201).send(news)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

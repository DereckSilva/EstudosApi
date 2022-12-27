import { findAllNews, create, 
    countNews, topPost, findOnlyNew, 
    newUser, updateNewUser, countedNewsUser, 
    removeNew, } from '../services/newsService.js'

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

export const topNews = async (req, res) => {

    try{
        const post = await topPost()
    
        if(!post) return res.status(500).send({message: 'Message not found'})
    
        return res.status(200).send(post)
        
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const findNew = async (req, res) => {
    try{    
        const { id } = req

        const onlyNew = await findOnlyNew(id)
        
        if(!onlyNew) return res.status(500).send({message: 'This new not exist'})

        return res.status(200).send(onlyNew)

    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const findNewsUser = async (req, res) => {
    try{

        const { id } = req

        let { limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)

        if(!limit) limit = 5
        if(!offset) offset = 0

        const newsUser = await newUser(id, limit, offset)
        const countNewsUser = await countedNewsUser(id)

        const currentUrl = req.baseUrl

        const nextm = offset + limit
        const nextUrl = nextm < countNewsUser ? `${currentUrl}?limit=${limit}&offset=${nextm}` : null

        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null


        if(newsUser.length == 0) return res.status(404).send({message: 'Not found news for this user'})

        return res.status(200).send({
            nextUrl, 
            previousUrl,
            limit,
            offset,
            countNewsUser,
            newsUser
        })

    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const updateNew = async (req, res) => {
    try{

        const { idNew, user } = req.body

        const newUpdated = await updateNewUser(idNew, user)

        if(!newUpdated) return res.status(500).send({message: 'Not is possible update this new'})

        return res.status(200).send({message: 'Message updated successfully'})
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const deleteNew = async (req, res) => {

    const { idNew } = req.body
    const { id } = req

    const news = await removeNew(id, idNew)

    console.log(news)
    

}
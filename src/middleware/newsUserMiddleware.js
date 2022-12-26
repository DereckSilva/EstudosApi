import { countedNewsUser, newUser } from "../services/newsService.js";

export const findNewsUser = async (req, res, next) => {
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
        const nextUrl = nextm < countNewsUser ? `${currentUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null


        if(newsUser.length == 0) return res.status(404).send({message: 'Not found news for this user'})

        req.newsUser = newsUser

        next()

    }catch(err){
        res.status(500).send({message: err.message})
    }
}
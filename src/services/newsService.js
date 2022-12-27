import { NewsModel } from '../model/newsModel.js'

export const create = (body) => {
    const news = NewsModel.create(body)

    return news
}

export const findAllNews = (limit, offset) => {
    const news = NewsModel.find()
                   .sort({_id: -1}) // where it is the first item for pagination
                   .skip( offset ) // how much to skip
                   .limit(limit) // limit the items 
                   .populate("user") // catch data of user and insert into object user

    return news
}

export const countNews = () => {
    const totalNews = NewsModel.countDocuments()

    return totalNews
}

export const countedNewsUser = (id) => {
    const totalNews = NewsModel.countDocuments({user: id})

    return totalNews
}

export const topPost = () => {
    //catching last register in the database -> using findOne with mongoDB
    const top = NewsModel.findOne().sort({_id: -1})

    return top
}

export const findOnlyNew = (id) => {
    const onlyNew = NewsModel.findById(id)

    return onlyNew
}

export const newUser = (id, limit, offset) => {
    const newsUser = NewsModel.find({user: id})
                              .sort({_id: -1})
                              .skip(offset)
                              .limit(limit)
    return newsUser
}

export const updateNewUser = (id, user) => {

    const news =  NewsModel.findByIdAndUpdate(id, user)

    return news
}

export const removeNew = (id, content) => {
    const news = NewsModel.findOneAndDelete({_id: content.idNew}, {
        user: id,
        title: content.title
    })

    return news
}
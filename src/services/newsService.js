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
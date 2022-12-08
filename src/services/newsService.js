import { NewsModel } from '../model/newsModel.js'

export const create = (body) => {
    const news = NewsModel.create(body)

    return news
}

export const findAllNews = () => {
    const news = NewsModel.find()

    return news
}

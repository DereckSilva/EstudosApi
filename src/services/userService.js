import { UserModel } from '../model/userModel.js'
import jwt from 'jsonwebtoken'

export const create = (body) => {
    const user = UserModel.create(body)
    
    return user
    
}

export const findEmail = (email) => {
    const user = UserModel.find({email: email})

    return user
}

export const findAll = () => {
    const user = UserModel.find()

    return user
}

export const findUser = (id) => {
    const user = UserModel.findById(id)

    return user
}

export const userUpdate = (id, dados) => {
    const user = UserModel.findByIdAndUpdate(id, dados)

    return user
}

export const generateToken = (email) => {
    const token = jwt.sign({email: email}, process.env.SECRET_JWT, {expiresIn: 20})

    return token
}



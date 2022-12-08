import mongoose from 'mongoose'
import {findUser} from '../services/userService.js'
import { UserModel } from '../model/userModel.js'
import bcrypt from 'bcrypt'

//verificando se o id é válido para o mongoose
export const verificaID = (req, res, next) => {
    const id = req.body.id != undefined ? req.body.id : req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({message: "Id inválido"})
    next()
}

//verificando se o usuário existe no banco de dados
export const verificaUser = async (req, res, next) => {
    
    try{

        const id = req.body.id != undefined ? req.body.id : req.params.id

        const user = await findUser(id)

        if(!user) return res.status(400).send({message: "Usuário não encontrado"})

        //passando informações para a minha próxima função
        req.id = id
        req.user = user

        next()
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const verificaSenha = async (req, res, next) => {
    try{
        const senha = req.body.password
    
        //com o select adicionamos mais uma info contida no banco
        const user = await findUser(req.id).select('+password')
        const compare = await bcrypt.compare(senha, user.password)

        if(!compare) return res.status(404).send({message: "Senha Inválida"})

        next()
    }catch(err){
        res.status(500).send({message: err.message})
    }
}


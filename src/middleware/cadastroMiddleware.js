import {check, validationResult} from 'express-validator'
import { findEmail } from '../services/userService.js'

export const checkEmail = [
    check("email")
    .custom(async (email) => {
        const user = await findEmail(email)

        if(user.length > 0) return res.status(400)
    })
    .withMessage("Email já cadastrado")
]

export const checkEmailVal = [
    check("email")
    .isEmail()
    .withMessage('Email inválido')
]

export const checaBody = [
    check('nome')
    .trim()
    .isLength({min: 5})
    .withMessage({message: 'Nome está abaixo dos caracteres'}),

    check("lastname")
    .trim()
    .isLength({min: 5})
    .withMessage('Digite o seu sobrenome')
]


export const validaErro = (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).send({error: error.array()[0].msg})
    }
    next()
}

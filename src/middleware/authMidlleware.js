import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { findEmail } from '../services/userService.js'

dotenv.config()

export const authMiddleware = (req, res, next) => {

    try{

        const { email } = req.body

        //caught information about authorization bearer token
        const { authorization } = req.headers
        const parts = authorization.split(' ')
    
        if (parts.length !== 2) return res.status(401).send({message: 'Nothing found an authorization'})
    
        const [schema, token] = parts
    
        if (schema !== 'Bearer') return res.status(401).send({message: 'Nothing found an authorization'})

        //verification about token access user
        jwt.verify(token, process.env.SECRET_JWT, async (error) => {
            
            //case found error 
            if(error) return res.status(401).send({message: 'Invalid Token'})
            
            const user = await findEmail(email)

            if(!user) return res.status(401).send({message: 'Not found user'})
            
            next()
        })
        
    }catch(err){
        res.status(500).send({message: err.message})
    }
}
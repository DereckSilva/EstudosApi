import {create, userUpdate, findAll} from '../services/userService.js'

export const user = async (req, res) => {

    try{
        const createUser = await create(req.body)

        let user = {
            message: "User created successful",
            user: {
                id: createUser._id,
                nome: req.body.nome,
                sobrenome: req.body.lastname,
                email: req.body.email
            }
        }

        //enviar o tipo de status conforme a requisição feita
        return res.status(201).send(user)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const findAllUser = async(req, res) => {

    try{
        const buscaUser = await findAll()

        if(!buscaUser) return res.status(404).send({message: "Não há usuários cadastrados"})

        return res.status(200).send(buscaUser)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const findUser = async (req, res) => {

    try{
        const filterUser = req.user

        return res.status(200).send(filterUser)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export const updateUser = async (req, res) => {

    try{
        await userUpdate(req.id, req.body)

    return res.status(200).send({message: "Usuário atualizado com sucesso"})
    }catch(err){
        res.status(500).send({message: err.message})
    }
}


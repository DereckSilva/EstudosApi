import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema({
    nome: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, select: false}
    //select false para não aparecer na consulta dos dados do usuário
})

// encriptando a senha do usuário dentro do sistema antes de salvar as informações
UserSchema.pre("save", function(next){

    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

export const UserModel = mongoose.model("User", UserSchema)

import mongoose from 'mongoose'

export const conexao = async () => {
    mongoose.connect(process.env.DB_CONNECTION,
        {useNewUrlParser: true, useUnifiedTopology:true})
    console.log('Database connected')
}
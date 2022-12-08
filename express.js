
import express  from 'express'
import { router } from './src/router/router.js'
import { routerNews }  from './src/router/newsRouter.js'
import { routerAuth } from './src/router/authRouter.js'
import {conexao} from './src/database/database.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3000

//utilização de json
app.use(express.json())

//utilizando as rotas para definir as mensagens
app.use('/user',router)
app.use('/news',routerNews)
app.use('/auth', routerAuth)

//conexão banco de dados
conexao()
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
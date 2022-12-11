
import express  from 'express'
import { router } from './src/router/router.js'
import { routerNews }  from './src/router/news.routes.js'
import { routerAuth } from './src/router/auth.routes.js'
import { conexao } from './src/database/database.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3000

//accept express used json
app.use(express.json())

//routes
app.use('/user',router)
app.use('/news',routerNews)
app.use('/auth', routerAuth)

//database connection
conexao()
app.listen(port, () => {
    console.log(`Server opening in the port ${port}`)
})
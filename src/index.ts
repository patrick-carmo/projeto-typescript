import 'dotenv/config'
import express from 'express'
import rotas from './routes/rotas'
const app = express()

app.use(express.json())
app.use(rotas)

app.listen(3000, () => {
  console.log('Server rodando na porta 3000')
})
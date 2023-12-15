import { Router } from 'express'
const rota = Router()

import {
  listarCarros,
  detalharCarros,
  cadastrarCarros,
  atualizarCarros,
  excluirCarros,
} from '../controllers/carros'

rota.get('/carros', listarCarros)
rota.get('/carros/:id', detalharCarros)
rota.post('/carros', cadastrarCarros)
rota.put('/carros/:id', atualizarCarros)
rota.delete('/carros/:id', excluirCarros)

export default rota

import { Request, Response } from 'express'
import { knex } from '../models/conexao'
import { Carro } from '../models/tipos'

export const listarCarros = async (_: Request, res: Response) => {
  try {
    const carros = await knex('carros').orderBy('id')
    res.status(200).json(carros)
  } catch {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const detalharCarros = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const carro = await knex<Carro>('carros')
      .where({ id: Number(id) })
      .first()

    if (!carro) {
      return res.status(404).json({ mensagem: 'Carro não encontrado' })
    }

    res.status(200).json(carro)
  } catch {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const cadastrarCarros = async (req: Request, res: Response) => {
  const { marca, modelo, cor, ano, valor } = req.body

  try {
    const carro = await knex<Omit<Carro, 'id'>>('carros')
      .insert({
        marca,
        modelo,
        cor,
        ano,
        valor,
      })
      .returning('*')

    res.status(201).json(carro)
  } catch {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const atualizarCarros = async (req: Request, res: Response) => {
  const { id } = req.params
  const { marca, modelo, cor, ano, valor } = req.body

  try {
    const carro = await knex<Carro>('carros')
      .where({ id: Number(id) })
      .first()

    if (!carro) {
      return res.status(404).json({ mensagem: 'Carro não encontrado' })
    }

    await knex<Carro>('carros')
      .update({
        marca,
        modelo,
        cor,
        ano,
        valor,
      })
      .where({ id: Number(id) })

    res.status(204).send()
  } catch {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export const excluirCarros = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const carro = await knex<Carro>('carros')
      .where({ id: Number(id) })
      .first()

    if (!carro) {
      return res.status(404).json({ mensagem: 'Carro não encontrado' })
    }

    await knex<Carro>('carros')
      .where({ id: Number(id) })
      .del()

    res.status(204).send()
  } catch {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

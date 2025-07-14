import { FastifyInstance } from 'fastify'
import { Knex } from 'knex'
import fp from 'fastify-plugin'
import { Lead } from '../../../schemas/leads.js'

declare module 'fastify' {
  interface FastifyInstance {
    leadsRepository: ReturnType<typeof createLeadsRepository>
  }
}

export function createLeadsRepository(fastify: FastifyInstance) {
  const knex = fastify.knex

  return {
    async findAll(trx?: Knex) {
      return (trx ?? knex)<Lead>('leads').select('*')
    },

    async findById(id: string, trx?: Knex) {
      return (trx ?? knex)<Lead>('leads')
        .where({ id })
        .first()
    },

    async create(input: Omit<Lead, 'id'>, trx?: Knex) {
      const [lead] = await (trx ?? knex)<Lead>('leads')
        .insert(input)
        .returning('*')
      return lead
    }
  }
}

export default fp(
  async function (fastify: FastifyInstance) {
    const repo = createLeadsRepository(fastify)
    fastify.decorate('leadsRepository', repo)
  },
  {
    name: 'leads-repository',
    dependencies: ['knex']
  }
)

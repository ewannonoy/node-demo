import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { Knex } from 'knex'

declare module 'fastify' {
  interface FastifyInstance {
    leadsRepository: ReturnType<typeof createLeadsRepository>
  }
}

export function createLeadsRepository(fastify: FastifyInstance) {
  const knex = fastify.knex

  return {
    async create(input: {
      name: string
      email: string
      mobile: string
      postcode: string
      serviceIds: string[]
    }) {
      return knex.transaction(async trx => {
        // Insert lead and get the inserted ID (works for MySQL)
        const [insertedId] = await trx('leads')
          .insert({
            name: input.name,
            email: input.email,
            mobile: input.mobile,
            postcode: input.postcode
          })

        // Fetch the newly inserted lead
        const lead = await trx('leads').where({ id: insertedId }).first()

        // Insert lead-service relationships
        const serviceInserts = input.serviceIds.map(serviceId => ({
          lead_id: insertedId,
          service_id: serviceId
        }))

        await trx('lead_services').insert(serviceInserts)

        return lead
      })
    },

    async findById(id: string, trx?: Knex) {
      return (trx ?? knex)('leads').where({ id }).first()
    },

    async findAll() {
      return knex('leads').select('*')
    }
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const repo = createLeadsRepository(fastify)
  fastify.decorate('leadsRepository', repo)
}, {
  name: 'leads-repository',
  dependencies: ['knex']
})

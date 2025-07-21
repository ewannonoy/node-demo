import { FastifyInstance } from 'fastify'

export function createResolvers(fastify: FastifyInstance) {
  return {
    Query: {
      leads: async () => {
        const { leadsRepository } = fastify
        return leadsRepository.findAll()
      },
      lead: async (_: any, { id }: { id: string }) => {
        const { leadsRepository } = fastify
        return leadsRepository.findById(id)
      },
    },
    Mutation: {
      register: async (_: any, { input }: { input: any }) => {
        const { leadsRepository } = fastify
        return leadsRepository.create(input)
      }
    }
  }
}

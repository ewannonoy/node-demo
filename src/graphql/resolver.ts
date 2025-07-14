import { FastifyInstance } from 'fastify'

type Lead = {
  id: string
  name: string
  email: string
  mobile: string
  postcode: string
  services: string[]
}

// In-memory storage
const leads: Lead[] = []

export function createResolvers(_fastify: FastifyInstance) {
  return {
    leads: async () => {
      return leads
    },
    lead: async ({ id }: { id: string }) => {
      return leads.find(lead => lead.id === id) || null
    },
    register: async ({ input }: { input: Omit<Lead, 'id'> }) => {
      const newLead: Lead = {
        id: crypto.randomUUID(),
        ...input,
      }
      leads.push(newLead)
      return newLead
    },
  }
}

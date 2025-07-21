import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import { build } from '../../helper.js'
import { createResolvers } from '../../../src/graphql/resolver.js'
import { FastifyInstance } from 'fastify'

async function resetDatabase(app: FastifyInstance) {

  await app.knex('lead_services').del()
  await app.knex('leads').del()
  await app.knex('services').del()

  await app.knex('services').insert([
    { id: 1, name: 'delivery' },
    { id: 2, name: 'pick-up' },
    { id: 3, name: 'payment' }
  ])
}

describe('GraphQL Resolvers: Leads', () => {
  let app: FastifyInstance
  let resolvers: ReturnType<typeof createResolvers>

  beforeEach(async () => {
    app = await build()
    await resetDatabase(app)
    resolvers = createResolvers(app)
  })

  afterEach(async () => {
    await app.close()
  })
  

  it('should register a lead via Mutation.register', async () => {
    const input = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      mobile: '1234567890',
      postcode: '90210',
      serviceIds: ['1', '2']
    }

    const lead = await resolvers.Mutation.register(null, { input })

    assert.ok(lead)
    assert.strictEqual(lead.name, input.name)

    const dbLead = await app.knex('leads').where({ id: lead.id }).first()
    assert.ok(dbLead)
    assert.strictEqual(dbLead.email, input.email)
  })

  it('should fetch all leads via Query.leads', async () => {
    await app.leadsRepository.create({
      name: 'Alice',
      email: 'alice@example.com',
      mobile: '1234567890',
      postcode: '90210',
      serviceIds: ['1']
    })

    await app.leadsRepository.create({
      name: 'Bob',
      email: 'bob@example.com',
      mobile: '0987654321',
      postcode: '10001',
      serviceIds: ['2']
    })

    const result = await resolvers.Query.leads()
    assert.ok(Array.isArray(result))
    assert.strictEqual(result.length, 2)
  })

  it('should fetch a lead by ID via Query.lead', async () => {
    const created = await app.leadsRepository.create({
      name: 'Charlie',
      email: 'charlie@example.com',
      mobile: '1111111111',
      postcode: '60606',
      serviceIds: ['3']
    })

    const result = await resolvers.Query.lead(null, { id: String(created.id) })

    assert.ok(result)
    assert.strictEqual(result.email, created.email)
  })
})

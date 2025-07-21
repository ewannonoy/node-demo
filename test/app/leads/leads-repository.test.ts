import { it, describe, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import { build } from '../../helper.js'
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

describe('Leads Repository', () => {
  let app: FastifyInstance

  beforeEach(async () => {
    app = await build()
    await resetDatabase(app)
  })

  afterEach(async () => {
    await app.close()
  })

  it('should create a lead with service IDs', async () => {
    const input = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      mobile: '1234567890',
      postcode: '90210',
      serviceIds: ['1', '2']
    }

    const lead = await app.leadsRepository.create(input)

    assert.ok(lead)
    assert.ok(lead.id, 'Lead ID should be defined')
    assert.strictEqual(lead.name, input.name)
    assert.strictEqual(lead.email, input.email)

    const leadInDb = await app.knex('leads').where({ id: lead.id }).first()
    assert.ok(leadInDb)

    const services = await app.knex('lead_services').where({ lead_id: lead.id })
    assert.strictEqual(services.length, input.serviceIds.length)
    assert.deepEqual(
      services.map(s => s.service_id).sort(),
      input.serviceIds.sort()
    )
  })

  it('should find a lead by ID', async () => {
    const lead = await app.leadsRepository.create({
      name: 'John Smith',
      email: 'john@example.com',
      mobile: '9876543210',
      postcode: '10001',
      serviceIds: ['1', '3']
    })

    assert.ok(lead?.id, 'Lead ID should be defined')

    const found = await app.leadsRepository.findById(lead.id)
    assert.ok(found)
    assert.strictEqual(found.email, lead.email)
  })

  it('should return all leads', async () => {
    const lead1 = await app.leadsRepository.create({
      name: 'Alice',
      email: 'alice@example.com',
      mobile: '5551234567',
      postcode: '30301',
      serviceIds: ['1']
    })

    const lead2 = await app.leadsRepository.create({
      name: 'Bob',
      email: 'bob@example.com',
      mobile: '5559876543',
      postcode: '40404',
      serviceIds: ['2', '3']
    })

    assert.ok(lead1?.id)
    assert.ok(lead2?.id)

    const leads = await app.leadsRepository.findAll()
    assert.ok(Array.isArray(leads))
    assert.strictEqual(leads.length, 2)

    const emails = leads.map(l => l.email).sort()
    assert.deepStrictEqual(emails, ['alice@example.com', 'bob@example.com'].sort())
  })
})

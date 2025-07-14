import { FastifyInstance } from 'fastify'
import mercurius from 'mercurius'
import { schema } from '../../graphql/schema.js'
import { createResolvers } from '../../graphql/resolver.js'
import fp from 'fastify-plugin'

export default fp(
  async function (fastify: FastifyInstance) {
    const resolvers = createResolvers(fastify)

    fastify.register(mercurius, {
      schema,
      resolvers,
      graphiql: true,
    })
  },
  {
    name: 'graphql',
  }
)

import { FastifyInstance } from 'fastify'
import mercurius from 'mercurius' 
import { schema } from '../../graphql/schema.js'
import { createResolvers } from '../../graphql/resolver.js'

export default async function (fastify: FastifyInstance) {
  const resolvers = createResolvers(fastify)

  fastify.register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
  })
}

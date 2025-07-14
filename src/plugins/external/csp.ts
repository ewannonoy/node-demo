import fp from 'fastify-plugin'

export default fp(async (fastify) => {
  fastify.addHook('onSend', (request, reply, payload, done) => {
    reply.header('Content-Security-Policy', [
      "default-src 'self'",
      "script-src 'self' https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://unpkg.com",
      "font-src 'self' https://unpkg.com",
      "connect-src 'self'",
      "img-src 'self' data:",
    ].join('; '))
    done(null, payload)
  })
})

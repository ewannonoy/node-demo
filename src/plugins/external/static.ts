import fastifyStatic, { FastifyStaticOptions } from '@fastify/static'
import { FastifyInstance } from 'fastify'
import path from 'node:path'

/**
 * This plugin serves static files from the public directory.
 * @see {@link https://github.com/fastify/fastify-static}
 */
export const autoConfig = (_fastify: FastifyInstance): FastifyStaticOptions => {
  return {
    root: path.join(import.meta.dirname, '../../..', 'public'),
    prefix: '/', // Serves files like /home.html, /css/style.css, etc.
  }
}

export default fastifyStatic

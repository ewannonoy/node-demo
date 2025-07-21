import { buildSchema } from 'graphql'

export const schema = buildSchema(`
  type Lead {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [Service!]!
  }

  type Service {
    id: ID!
    name: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    serviceIds: [ID!]!
  }

  type Query {
    leads: [Lead!]!
    lead(id: ID!): Lead
    services: [Service!]!
  }

  type Mutation {
    register(input: RegisterInput!): Lead!
  }
`)

import { buildSchema } from 'graphql'

export const schema = buildSchema(`
  type Lead {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [String!]!
  }

  input LeadInput {
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [String!]!
  }

  type Query {
    leads: [Lead!]!
    lead(id: ID!): Lead
  }

  type Mutation {
    register(input: LeadInput!): Lead!
  }
`)

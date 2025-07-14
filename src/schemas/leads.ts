import { Static, Type } from '@sinclair/typebox'

export const LeadSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  phone: Type.Optional(Type.String())
})

export type Lead = Static<typeof LeadSchema>

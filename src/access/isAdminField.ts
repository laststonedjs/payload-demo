import type { FieldAccess } from 'payload'

export const isAdminField: FieldAccess = ({ req }) => {
  const user = req.user as any
  return user?.role === 'admin'
}

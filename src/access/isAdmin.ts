import type { Access } from 'payload'

export const isAdmin: Access = ({ req }) => {
  const user = req.user
  return Boolean(user && (user as any).role === 'admin')
}

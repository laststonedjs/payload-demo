import type { Access } from 'payload'

export const isAdminOrEditor: Access = ({ req }) => {
  const user = req.user
  const role = user ? (user as any).role : null
  return role === 'admin' || role === 'editor'
}

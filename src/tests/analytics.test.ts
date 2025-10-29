import { describe, it, expect } from 'vitest'
import { computeAnalytics } from '../lib/analytics'

describe('analytics', () => {
  it('computes users/posts/todos stats with tie-breaking', () => {
    const users = [
      { id: 1, name: 'A', username: 'alice', email: '', phone: '', website: '', company: { name: '' } },
      { id: 2, name: 'B', username: 'bob', email: '', phone: '', website: '', company: { name: '' } },
      { id: 3, name: 'C', username: 'carol', email: '', phone: '', website: '', company: { name: '' } },
    ]
    const posts = [
      { id: 1, userId: 1, title: '', body: '' },
      { id: 2, userId: 2, title: '', body: '' },
      { id: 3, userId: 2, title: '', body: '' },
    ]
    const todos = [
      { id: 1, userId: 1, title: '', completed: true },
      { id: 2, userId: 1, title: '', completed: true },
      { id: 3, userId: 2, title: '', completed: true },
    ]
    const stats = computeAnalytics(users as any, posts as any, todos as any)
    expect(stats.totalUsers).toBe(3)
    expect(stats.mostPostsUser?.username).toBe('bob')
    expect(stats.fewestPostsUser?.count).toBe(0)
    expect(stats.mostCompletedTodosUser?.username).toBe('alice')
    expect(stats.fewestCompletedTodosUser?.count).toBe(0)
  })
})

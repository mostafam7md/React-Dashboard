import React from 'react'
import { useAllPosts, useAllTodos, useUsers } from '../../hooks/useApi'
import type { User } from '../../types/api'

type StatRow = {
  user?: User
  count: number
}

function findMax(
  users: User[],
  counts: Map<number, number>,
): StatRow | undefined {
  let best: StatRow | undefined
  for (const user of users) {
    const value = counts.get(user.id) ?? 0
    if (!best || value > best.count) {
      best = { user, count: value }
    }
  }
  return best
}

function findMin(
  users: User[],
  counts: Map<number, number>,
): StatRow | undefined {
  let best: StatRow | undefined
  for (const user of users) {
    const value = counts.get(user.id) ?? 0
    if (!best || value < best.count) {
      best = { user, count: value }
    }
  }
  return best
}

const AnalyticsCard: React.FC = () => {
  const { data: users, isLoading: loadingUsers } = useUsers()
  const { data: posts, isLoading: loadingPosts } = useAllPosts()
  const { data: todos, isLoading: loadingTodos } = useAllTodos()

  if (loadingUsers || loadingPosts || loadingTodos) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-2">Simple Analytics</h2>
        <p className="text-sm">Calculating statistics...</p>
      </div>
    )
  }

  if (!users || !posts || !todos) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-2">Simple Analytics</h2>
        <p className="text-sm text-red-600">Could not load data.</p>
      </div>
    )
  }

  const postCounts = new Map<number, number>()
  const completedTodoCounts = new Map<number, number>()

  for (const post of posts) {
    postCounts.set(post.userId, (postCounts.get(post.userId) ?? 0) + 1)
  }

  for (const todo of todos) {
    if (todo.completed) {
      completedTodoCounts.set(
        todo.userId,
        (completedTodoCounts.get(todo.userId) ?? 0) + 1,
      )
    }
  }

  const mostPosts = findMax(users, postCounts)
  const fewestPosts = findMin(users, postCounts)
  const mostCompletedTodos = findMax(users, completedTodoCounts)
  const fewestCompletedTodos = findMin(users, completedTodoCounts)

  const box = (title: string, stat?: StatRow) => (
    <div className="border rounded p-3 bg-slate-50 text-xs flex-1">
      <h3 className="font-semibold mb-1 text-[11px] uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      {stat?.user ? (
        <>
          <p className="font-medium">{stat.user.name}</p>
          <p className="text-[11px] text-slate-500">
            @{stat.user.username} — <span className="font-semibold">{stat.count}</span>
          </p>
        </>
      ) : (
        <p>No data</p>
      )}
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <h2 className="font-semibold mb-2">Simple Analytics</h2>
      <p className="text-xs text-slate-500 mb-3">
        Statistics based on JSONPlaceholder users, posts, and to-dos.
      </p>
      <div className="mb-3 text-sm">
        <span className="font-semibold">Total users:</span>{' '}
        {users.length}
      </div>
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex gap-2">
          {box('Most posts', mostPosts)}
          {box('Fewest posts', fewestPosts)}
        </div>
        <div className="flex gap-2">
          {box('Most completed to-dos', mostCompletedTodos)}
          {box('Fewest completed to-dos', fewestCompletedTodos)}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsCard

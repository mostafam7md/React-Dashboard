import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useUser, useUserPosts, useUserTodos } from '../hooks/useApi'
import { useTodoState } from '../contexts/TodoStateContext'

const UserDetailPage: React.FC = () => {
  const params = useParams()
  const userId = Number(params.id)
  const { overrides, toggleTodo } = useTodoState()
  const { data: user, isLoading: loadingUser } = useUser(userId)
  const { data: posts, isLoading: loadingPosts } = useUserPosts(userId)
  const { data: todos, isLoading: loadingTodos } = useUserTodos(userId)

  const userOverrides = overrides[userId] || {}

  const renderCompleted = (todoId: number, apiCompleted: boolean) => {
    const override = userOverrides[todoId]
    if (typeof override === 'boolean') return override
    return apiCompleted
  }

  return (
    <Layout>
      <Link
        to="/dashboard"
        className="inline-block mb-3 text-xs text-slate-600 underline"
      >
        ← Back to dashboard
      </Link>
      {loadingUser ? (
        <p>Loading user...</p>
      ) : !user ? (
        <p>User not found.</p>
      ) : (
        <>
          <h1 className="text-xl font-semibold mb-1">{user.name}</h1>
          <p className="text-sm text-slate-600 mb-4">
            @{user.username} · {user.email} · {user.address.city}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="bg-white rounded-lg shadow p-3">
              <h2 className="font-semibold mb-2 text-sm">Posts</h2>
              {loadingPosts && <p className="text-sm">Loading posts...</p>}
              <ul className="space-y-2 max-h-80 overflow-auto">
                {posts?.map((post) => (
                  <li key={post.id} className="border rounded p-2 text-xs">
                    <h3 className="font-semibold mb-1">{post.title}</h3>
                    <p>{post.body}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section className="bg-white rounded-lg shadow p-3">
              <h2 className="font-semibold mb-2 text-sm">To-dos</h2>
              {loadingTodos && <p className="text-sm">Loading to-dos...</p>}
              <ul className="space-y-2 max-h-80 overflow-auto">
                {todos?.map((todo) => {
                  const completed = renderCompleted(todo.id, todo.completed)
                  return (
                    <li
                      key={todo.id}
                      className={`border rounded p-2 text-xs flex items-start gap-2 ${
                        completed ? 'bg-green-50' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5"
                        checked={completed}
                        onChange={(e) =>
                          toggleTodo(userId, todo.id, e.target.checked)
                        }
                      />
                      <span
                        className={
                          completed ? 'line-through text-green-700' : ''
                        }
                      >
                        {todo.title}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>
          </div>
        </>
      )}
    </Layout>
  )
}

export default UserDetailPage

import Card from '../../components/Card'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import { useUsers } from '../../hooks/useUsers'
import { useQuery } from '@tanstack/react-query'
import { fetchUserPosts } from '../../api/posts'
import { fetchUserTodos } from '../../api/todos'
import { computeAnalytics } from '../../lib/analytics'

export default function Analytics() {
  const usersQ = useUsers()

  const postsQ = useQuery({
    queryKey: ['all-posts'],
    enabled: !!usersQ.data?.length,
    queryFn: async () => {
      const users = usersQ.data || []
      const all = await Promise.all(users.map(u => fetchUserPosts(u.id)))
      return all.flat()
    },
  })

  const todosQ = useQuery({
    queryKey: ['all-todos'],
    enabled: !!usersQ.data?.length,
    queryFn: async () => {
      const users = usersQ.data || []
      const all = await Promise.all(users.map(u => fetchUserTodos(u.id)))
      return all.flat()
    },
  })

  if (usersQ.isLoading || postsQ.isLoading || todosQ.isLoading) return <Loader label="Crunching numbers..." />
  if (usersQ.isError || postsQ.isError || todosQ.isError) return <ErrorState message="Failed to compute analytics." />

  const stats = computeAnalytics(usersQ.data || [], postsQ.data || [], todosQ.data || [])

  const Box = ({ label, value }: { label: string; value: string }) => (
    <div className="rounded-lg border bg-white p-4 dark:bg-slate-900 dark:border-slate-700">
      <p className="text-sm text-gray-500 dark:text-slate-400">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  )

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Simple Analytics</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Box label="Total Users" value={String(stats.totalUsers)} />
        <Box label="Most Posts" value={stats.mostPostsUser ? `${stats.mostPostsUser.username} (${stats.mostPostsUser.count})` : '—'} />
        <Box label="Fewest Posts" value={stats.fewestPostsUser ? `${stats.fewestPostsUser.username} (${stats.fewestPostsUser.count})` : '—'} />
        <Box label="Most Completed To-dos" value={stats.mostCompletedTodosUser ? `${stats.mostCompletedTodosUser.username} (${stats.mostCompletedTodosUser.count})` : '—'} />
        <Box label="Fewest Completed To-dos" value={stats.fewestCompletedTodosUser ? `${stats.fewestCompletedTodosUser.username} (${stats.fewestCompletedTodosUser.count})` : '—'} />
      </div>
    </Card>
  )
}

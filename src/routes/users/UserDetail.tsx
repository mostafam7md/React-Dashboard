import { useParams } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'
import { useUserPosts } from '../../hooks/useUserPosts'
import { useUserTodos } from '../../hooks/useUserTodos'
import Card from '../../components/Card'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'
import clsx from 'clsx'
import { useAuth } from '../../context/auth'

export default function UserDetail(){
  const { id } = useParams()
  const userId = Number(id)
  const { data: users } = useUsers()
  const user = users?.find(u=>u.id===userId)

  const { data: posts, isLoading: postsLoading, isError: postsError } = useUserPosts(userId)
  const { data: todos, isLoading: todosLoading, isError: todosError, setTodoDone } = useUserTodos(userId)
  const { setTodoOverride } = useAuth()

  if(!user) return <Loader label="Loading user..." />
  if(postsError || todosError) return <ErrorState message="Failed loading data." />

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Website:</b> {user.website}</p>
        <p><b>Company:</b> {user.company?.name}</p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold mb-3">Posts</h3>
          {postsLoading ? <Loader label="Loading posts..." /> : (
            <ul className="space-y-2 max-h-96 overflow-auto pr-1">
              {posts?.map(p=>(
                <li key={p.id}>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">{p.body}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-3">To-dos</h3>
          {todosLoading ? <Loader label="Loading to-dos..." /> : (
            <ul className="space-y-2 max-h-96 overflow-auto pr-1">
              {todos?.map(t=>{
                const onToggle=()=>{ const next=!t.completed; setTodoDone(t.id,next); setTodoOverride(userId,t.id,next) }
                return (
                  <li key={t.id} className="flex items-start gap-2">
                    <input aria-label={`toggle ${t.title}`} type="checkbox" checked={t.completed} onChange={onToggle} className="mt-1" />
                    <span className={clsx('text-sm', t.completed && 'text-green-400 line-through')}>{t.title}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}

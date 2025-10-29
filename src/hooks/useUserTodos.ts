import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchUserTodos, Todo } from '../api/todos'
import { useAuth } from '../context/auth'
export function useUserTodos(userId:number){
  const { state } = useAuth()
  const client = useQueryClient()
  const q = useQuery<Todo[]>({ queryKey:['todos',userId], queryFn:()=>fetchUserTodos(userId), enabled:!!userId, select:(todos)=>{
    const overrides = state.todoOverrides[String(userId)] || {}
    return todos.map(t=>{const o = overrides[String(t.id)]; return typeof o==='boolean'?{...t,completed:o}:t})
  }})
  function setTodoDone(todoId:number, done:boolean){
    client.setQueryData<Todo[]>(['todos',userId], (old)=>(old||[]).map(t=>t.id===todoId?{...t,completed:done}:t))
  }
  return { ...q, setTodoDone }
}

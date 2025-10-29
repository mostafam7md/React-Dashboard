import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useUsers } from '../../hooks/useUsers'
import Card from '../../components/Card'
import Loader from '../../components/Loader'
import ErrorState from '../../components/ErrorState'

function useDebounce<T>(value:T, delay=300){
  const [debounced,setDebounced]=useState(value)
  useEffect(()=>{const id=setTimeout(()=>setDebounced(value),delay);return()=>clearTimeout(id)},[value,delay])
  return debounced
}

export default function UsersList(){
  const { data, isLoading, isError } = useUsers()
  const [query,setQuery]=useState(''); const [page,setPage]=useState(1); const pageSize=5
  const debounced=useDebounce(query,300)

  const filtered=useMemo(()=>{
    const list=data||[]; if(!debounced) return list
    const q=debounced.toLowerCase()
    return list.filter(u=>u.name.toLowerCase().includes(q)||u.username.toLowerCase().includes(q)||u.email.toLowerCase().includes(q))
  },[data,debounced])

  const pageCount=Math.max(1,Math.ceil((filtered?.length||0)/pageSize))
  const pageItems=filtered.slice((page-1)*pageSize,page*pageSize)
  useEffect(()=>{setPage(1)},[debounced])

  if(isLoading) return <Loader label="Loading users..." />
  if(isError) return <ErrorState message="Failed to load users." />

  return (
    <Card>
      <div className="flex items-end justify-between gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium">Search</label>
          <input id="search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Name, username, or email..." className="input mt-1" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Company</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map(u=>(
              <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800">
                <td className="p-2"><Link className="text-brand-700 dark:text-brand-300 underline" to={`/users/${u.id}`}>{u.name}</Link></td>
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.company?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600 dark:text-slate-400">Showing {(page-1)*pageSize+1}-{Math.min(page*pageSize,filtered.length)} of {filtered.length}</p>
        <div className="inline-flex gap-2">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-3 py-1.5 rounded-md border bg-white disabled:opacity-50 dark:bg-slate-800 dark:border-slate-700">Prev</button>
          <span className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-slate-800">{page}/{pageCount}</span>
          <button onClick={()=>setPage(p=>Math.min(pageCount,p+1))} disabled={page===pageCount} className="px-3 py-1.5 rounded-md border bg-white disabled:opacity-50 dark:bg-slate-800 dark:border-slate-700">Next</button>
        </div>
      </div>
    </Card>
  )
}

import { useQuery } from '@tanstack/react-query'
import type { User, Post, Todo } from '../types/api'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Network error')
  }
  return res.json()
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetchJson<User[]>(`${BASE_URL}/users`),
  })
}

export function useUser(userId: number | undefined) {
  return useQuery<User>({
    queryKey: ['users', userId],
    queryFn: () => fetchJson<User>(`${BASE_URL}/users/${userId}`),
    enabled: typeof userId === 'number',
  })
}

export function useUserPosts(userId: number | undefined) {
  return useQuery<Post[]>({
    queryKey: ['posts', userId],
    queryFn: () => fetchJson<Post[]>(`${BASE_URL}/posts?userId=${userId}`),
    enabled: typeof userId === 'number',
  })
}

export function useUserTodos(userId: number | undefined) {
  return useQuery<Todo[]>({
    queryKey: ['todos', userId],
    queryFn: () => fetchJson<Todo[]>(`${BASE_URL}/todos?userId=${userId}`),
    enabled: typeof userId === 'number',
  })
}

export function useAllPosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => fetchJson<Post[]>(`${BASE_URL}/posts`),
  })
}

export function useAllTodos() {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => fetchJson<Todo[]>(`${BASE_URL}/todos`),
  })
}

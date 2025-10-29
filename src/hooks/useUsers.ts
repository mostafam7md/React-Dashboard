import { useQuery } from '@tanstack/react-query'
import { fetchUsers, User } from '../api/users'
export function useUsers(){return useQuery<User[]>({queryKey:['users'],queryFn:fetchUsers})}

import { useQuery } from '@tanstack/react-query'
import { fetchUserPosts, Post } from '../api/posts'
export function useUserPosts(userId:number){return useQuery<Post[]>({queryKey:['posts',userId],queryFn:()=>fetchUserPosts(userId),enabled:!!userId})}

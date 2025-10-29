import { api } from './client'
export type Post={userId:number;id:number;title:string;body:string}
export async function fetchUserPosts(userId:number):Promise<Post[]>{const {data}=await api.get<Post[]>(`/users/${userId}/posts`);return data}

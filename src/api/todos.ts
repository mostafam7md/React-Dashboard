import { api } from './client'
export type Todo={userId:number;id:number;title:string;completed:boolean}
export async function fetchUserTodos(userId:number):Promise<Todo[]>{const {data}=await api.get<Todo[]>(`/users/${userId}/todos`);return data}

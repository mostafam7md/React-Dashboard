import { api } from './client'
export type User={id:number;name:string;username:string;email:string;phone:string;website:string;company:{name:string}}
export async function fetchUsers():Promise<User[]>{const {data}=await api.get<User[]>('/users');return data}

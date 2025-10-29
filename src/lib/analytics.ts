import type { User } from '../api/users'
import type { Post } from '../api/posts'
import type { Todo } from '../api/todos'
export type AnalyticsStats={totalUsers:number;mostPostsUser:{username:string;count:number}|null;fewestPostsUser:{username:string;count:number}|null;mostCompletedTodosUser:{username:string;count:number}|null;fewestCompletedTodosUser:{username:string;count:number}|null}
export function computeAnalytics(users:User[],posts:Post[],todos:Todo[]):AnalyticsStats{
  const postsCount=new Map<number,number>(), completed=new Map<number,number>()
  for(const p of posts) postsCount.set(p.userId,(postsCount.get(p.userId)||0)+1)
  for(const t of todos) if(t.completed) completed.set(t.userId,(completed.get(t.userId)||0)+1)
  const rows = users.map(u=>({id:u.id,username:u.username,posts:postsCount.get(u.id)||0,completed:completed.get(u.id)||0}))
  const byPosts=[...rows].sort((a,b)=>a.posts===b.posts?a.username.localeCompare(b.username):a.posts-b.posts)
  const byTodos=[...rows].sort((a,b)=>a.completed===b.completed?a.username.localeCompare(b.username):a.completed-b.completed)
  return {
    totalUsers: users.length,
    mostPostsUser: byPosts.length?{username:byPosts.at(-1)!.username,count:byPosts.at(-1)!.posts}:null,
    fewestPostsUser: byPosts.length?{username:byPosts[0].username,count:byPosts[0].posts}:null,
    mostCompletedTodosUser: byTodos.length?{username:byTodos.at(-1)!.username,count:byTodos.at(-1)!.completed}:null,
    fewestCompletedTodosUser: byTodos.length?{username:byTodos[0].username,count:byTodos[0].completed}:null,
  }
}

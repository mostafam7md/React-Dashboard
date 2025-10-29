export function getJSON<T>(key:string):T|null{try{const raw=localStorage.getItem(key);return raw?(JSON.parse(raw) as T):null}catch{return null}}
export function setJSON<T>(key:string,value:T){localStorage.setItem(key,JSON.stringify(value))}

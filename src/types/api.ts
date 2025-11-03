export type User = {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
  company: {
    name: string
  }
}

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

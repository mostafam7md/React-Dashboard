import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '../context/auth'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../components/Card'

const schema = z.object({ username: z.string().min(1,'Username is required'), password: z.string().min(1,'Password is required') })
type LoginForm = z.infer<typeof schema>

export default function Login() {
  const { state, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as any
  const { register, handleSubmit, formState:{ errors }, setError } = useForm<LoginForm>({ defaultValues:{ username:'', password:'' } })

  useEffect(() => { if (state.isAuthenticated) navigate('/dashboard', { replace: true }) }, [state.isAuthenticated, navigate])

  const onSubmit = (data: LoginForm) => {
    const res = schema.safeParse(data)
    if (!res.success) return
    const { username, password } = res.data
    if (username === 'admin' && password === 'admin123') {
      login(username)
      const redirectTo = location.state?.from?.pathname || '/dashboard'
      navigate(redirectTo, { replace: true })
    } else setError('password', { message: 'Invalid credentials' })
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Welcome</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input id="username" {...register('username')} className="input mt-1" />
            {errors.username && <p className="text-sm text-red-600 mt-1" role="alert">{errors.username.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input id="password" type="password" {...register('password')} className="input mt-1" />
            {errors.password && <p className="text-sm text-red-600 mt-1" role="alert">{errors.password.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-full">Login</button>
          <p className="text-xs text-gray-500 dark:text-slate-400">Use <b>admin</b> / <b>admin123</b></p>
        </form>
      </Card>
    </div>
  )
}

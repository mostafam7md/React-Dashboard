import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../context/auth'
import Login from '../routes/Login'

function renderWithProviders(ui: React.ReactNode) {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>{ui}</AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('Auth/Login', () => {
  it('fails with wrong credentials', async () => {
    renderWithProviders(<Login />)
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'x' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'y' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    const alert = await screen.findByRole('alert')
    expect(alert.textContent?.toLowerCase()).toContain('invalid')
  })

  it('succeeds with dummy credentials', async () => {
    renderWithProviders(<Login />)
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'admin123' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    expect(screen.queryByRole('alert')).toBeNull()
  })
})

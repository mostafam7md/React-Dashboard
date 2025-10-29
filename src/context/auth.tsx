import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { getJSON, setJSON } from '../lib/storage'

type NotePriority = 'important' | 'normal' | 'delayed'
export type Note = { id: string; content: string; priority: NotePriority; createdAt: string }

type AuthState = {
  username: string | null
  isAuthenticated: boolean
  notes: Note[]
  todoOverrides: Record<string, Record<string, boolean>>
}

type Action =
  | { type: 'RESTORE'; payload: Partial<AuthState> }
  | { type: 'LOGIN_SUCCESS'; payload: { username: string } }
  | { type: 'LOGOUT' }
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: { id: string } }
  | { type: 'UPDATE_NOTE'; payload: { id: string; priority: NotePriority } }
  | { type: 'CLEAR_NOTES' }
  | { type: 'TOGGLE_TODO'; payload: { userId: number; todoId: number; done: boolean } }

const initialState: AuthState = { username: null, isAuthenticated: false, notes: [], todoOverrides: {} }
const STORAGE_KEY = 'app_state_v1'

function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'RESTORE': return { ...state, ...action.payload, isAuthenticated: !!action.payload.isAuthenticated }
    case 'LOGIN_SUCCESS': return { ...state, username: action.payload.username, isAuthenticated: true }
    case 'LOGOUT': return { ...initialState }
    case 'ADD_NOTE': return { ...state, notes: [action.payload, ...state.notes] }
    case 'DELETE_NOTE': return { ...state, notes: state.notes.filter(n => n.id !== action.payload.id) }
    case 'UPDATE_NOTE': return { ...state, notes: state.notes.map(n => n.id === action.payload.id ? { ...n, priority: action.payload.priority } : n) }
    case 'CLEAR_NOTES': return { ...state, notes: [] }
    case 'TOGGLE_TODO': {
      const userKey = String(action.payload.userId)
      const existing = state.todoOverrides[userKey] || {}
      return { ...state, todoOverrides: { ...state.todoOverrides, [userKey]: { ...existing, [String(action.payload.todoId)]: action.payload.done } } }
    }
    default: return state
  }
}

type Ctx = {
  state: AuthState
  login: (username: string) => void
  logout: () => void
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void
  deleteNote: (id: string) => void
  updateNote: (id: string, priority: NotePriority) => void
  clearNotes: () => void
  setTodoOverride: (userId: number, todoId: number, done: boolean) => void
}

const AuthContext = createContext<Ctx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => { const saved = getJSON<AuthState>(STORAGE_KEY); if (saved) dispatch({ type: 'RESTORE', payload: saved }) }, [])
  useEffect(() => { setJSON(STORAGE_KEY, state) }, [state])

  const value: Ctx = {
    state,
    login: (username) => dispatch({ type: 'LOGIN_SUCCESS', payload: { username } }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    addNote: (note) => dispatch({ type: 'ADD_NOTE', payload: { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...note } }),
    deleteNote: (id) => dispatch({ type: 'DELETE_NOTE', payload: { id } }),
    updateNote: (id, priority) => dispatch({ type: 'UPDATE_NOTE', payload: { id, priority } }),
    clearNotes: () => dispatch({ type: 'CLEAR_NOTES' }),
    setTodoOverride: (userId, todoId, done) => dispatch({ type: 'TOGGLE_TODO', payload: { userId, todoId, done } }),
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth must be used within AuthProvider'); return ctx }

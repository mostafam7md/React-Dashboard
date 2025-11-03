import React, { createContext, useContext, useState, ReactNode } from 'react'

type TodoOverrideState = {
  [userId: number]: {
    [todoId: number]: boolean
  }
}

type TodoStateContextType = {
  overrides: TodoOverrideState
  toggleTodo: (userId: number, todoId: number, completed: boolean) => void
}

const TodoStateContext = createContext<TodoStateContextType | undefined>(
  undefined,
)

export const TodoStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [overrides, setOverrides] = useState<TodoOverrideState>({})

  const toggleTodo = (userId: number, todoId: number, completed: boolean) => {
    setOverrides((prev) => ({
      ...prev,
      [userId]: {
        ...(prev[userId] || {}),
        [todoId]: completed,
      },
    }))
  }

  return (
    <TodoStateContext.Provider value={{ overrides, toggleTodo }}>
      {children}
    </TodoStateContext.Provider>
  )
}

export const useTodoState = () => {
  const ctx = useContext(TodoStateContext)
  if (!ctx) throw new Error('useTodoState must be used within TodoStateProvider')
  return ctx
}

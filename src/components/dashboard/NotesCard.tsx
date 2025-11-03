import React, { useState } from 'react'

type Priority = 'important' | 'normal' | 'delayed'

type Note = {
  id: number
  text: string
  priority: Priority
}

const priorityLabels: Record<Priority, string> = {
  important: 'Important',
  normal: 'Normal',
  delayed: 'Delayed',
}

const NotesCard: React.FC = () => {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('normal')
  const [notes, setNotes] = useState<Note[]>([])

  const addNote = () => {
    if (!text.trim()) return
    setNotes((prev) => [
      ...prev,
      { id: Date.now(), text: text.trim(), priority },
    ])
    setText('')
  }

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  const changePriority = (id: number, newPriority: Priority) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, priority: newPriority } : n)),
    )
  }

  const renderColumn = (groupPriority: Priority) => {
    return (
      <div className="flex-1 border rounded p-2 bg-slate-50">
        <h3 className="text-xs font-semibold mb-2">
          {priorityLabels[groupPriority]}
        </h3>
        <div className="space-y-2 max-h-64 overflow-auto">
          {notes
            .filter((n) => n.priority === groupPriority)
            .map((note) => (
              <div
                key={note.id}
                className="bg-white border rounded p-2 text-xs flex flex-col gap-1"
              >
                <p>{note.text}</p>
                <div className="flex items-center justify-between gap-2">
                  <select
                    className="border rounded px-1 py-0.5 text-[11px]"
                    value={note.priority}
                    onChange={(e) =>
                      changePriority(
                        note.id,
                        e.target.value as Priority,
                      )
                    }
                  >
                    <option value="important">Important</option>
                    <option value="normal">Normal</option>
                    <option value="delayed">Delayed</option>
                  </select>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-[11px] text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <h2 className="font-semibold mb-2">Note Manager</h2>
      <p className="text-xs text-slate-500 mb-3">
        Add notes and categorize them by priority.
      </p>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Write a note..."
          className="flex-1 border rounded px-2 py-1 text-xs"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select
          className="border rounded px-2 py-1 text-xs"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="important">Important</option>
          <option value="normal">Normal</option>
          <option value="delayed">Delayed</option>
        </select>
        <button
          onClick={addNote}
          className="bg-slate-900 text-white rounded px-3 text-xs"
        >
          Add
        </button>
      </div>
      <div className="flex gap-2 text-xs flex-1">
        {renderColumn('important')}
        {renderColumn('normal')}
        {renderColumn('delayed')}
      </div>
    </div>
  )
}

export default NotesCard

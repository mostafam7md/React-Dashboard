import { useMemo, useState } from 'react'
import Card from '../../components/Card'
import { useAuth, Note } from '../../context/auth'
import { format } from 'date-fns'
type Priority = 'important' | 'normal' | 'delayed'

export default function Notes() {
  const { state, addNote, deleteNote, updateNote, clearNotes } = useAuth()
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState<Priority>('normal')

  const grouped = useMemo(() => {
    const by: Record<Priority, Note[]> = { important: [], normal: [], delayed: [] }
    for (const n of state.notes) by[n.priority as Priority]?.push(n)
    return by
  }, [state.notes])

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    addNote({ content: content.trim(), priority })
    setContent(''); setPriority('normal')
  }

  const confirmClear = () => { if (confirm('Clear all notes?')) clearNotes() }

  const Column = ({ title, items }: { title: string; items: Note[] }) => (
    <Card>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="space-y-3">
        {items.map(n => (
          <li key={n.id} className="rounded-md border p-2 dark:border-slate-700">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm">{n.content}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">{format(new Date(n.createdAt), 'PPpp')}</p>
              </div>
              <div className="flex items-center gap-2">
                <select value={n.priority} onChange={e => updateNote(n.id, e.target.value as Priority)} className="select text-sm">
                  <option value="important">important</option>
                  <option value="normal">normal</option>
                  <option value="delayed">delayed</option>
                </select>
                <button onClick={() => deleteNote(n.id)} className="text-sm px-2 py-1 rounded bg-red-600 text-white">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )

  return (
    <div className="space-y-6">
      <Card>
        <form onSubmit={onAdd} className="flex flex-col sm:flex-row gap-2">
          <label className="sr-only" htmlFor="note">Note</label>
          <input id="note" value={content} onChange={e => setContent(e.target.value)} placeholder="Write a note..." className="input" />
          <select value={priority} onChange={e => setPriority(e.target.value as Priority)} className="select">
            <option value="important">important</option>
            <option value="normal">normal</option>
            <option value="delayed">delayed</option>
          </select>
          <button type="submit" className="btn btn-primary">Add Note</button>
          <button type="button" onClick={confirmClear} className="btn btn-ghost">Clear all</button>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Column title="Important" items={grouped.important} />
        <Column title="Normal" items={grouped.normal} />
        <Column title="Delayed" items={grouped.delayed} />
      </div>
    </div>
  )
}

export default function Loader({ label = 'Loading...' }: { label?: string }) { return <div role="status" aria-live="polite" className="animate-pulse text-gray-600 dark:text-slate-400">{label}</div> }

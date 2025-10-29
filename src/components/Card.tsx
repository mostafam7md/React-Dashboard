import { PropsWithChildren } from 'react'
import clsx from 'clsx'

type Props = PropsWithChildren<{ className?: string }>

export default function Card({ className, children }: Props) {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-white shadow-soft ring-1 ring-black/[0.05] p-5',
        'dark:bg-slate-900 dark:ring-white/10 dark:shadow-none',
        className,
      )}
    >
      {children}
    </div>
  )
}

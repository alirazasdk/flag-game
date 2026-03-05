'use client'

import { cn } from '@/lib/utils'

type OptionState = 'default' | 'correct' | 'wrong' | 'disabled'

interface OptionButtonProps {
  label: string
  state: OptionState
  onClick: () => void
}

export default function OptionButton({ label, state, onClick }: OptionButtonProps) {
  const isDisabled = state === 'disabled' || state === 'correct' || state === 'wrong'

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'w-full px-4 py-3 rounded-lg border text-sm font-medium text-left transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        state === 'default' &&
          'bg-card border-border hover:bg-accent hover:border-accent-foreground/20 text-card-foreground',
        state === 'correct' &&
          'bg-green-500 border-green-600 text-white cursor-default',
        state === 'wrong' &&
          'bg-red-500 border-red-600 text-white cursor-default',
        state === 'disabled' &&
          'bg-muted border-border text-muted-foreground cursor-not-allowed opacity-60'
      )}
    >
      {label}
    </button>
  )
}

'use client'

import { cn } from '@/lib/utils'

type OptionState = 'default' | 'correct' | 'wrong' | 'disabled'

interface OptionButtonProps {
  label: string
  state: OptionState
  onClick: () => void
}

const STATE_ICON: Record<OptionState, string> = {
  default:  '',
  correct:  '✓',
  wrong:    '✕',
  disabled: '',
}

export default function OptionButton({ label, state, onClick }: OptionButtonProps) {
  const isDisabled = state !== 'default'
  const icon = STATE_ICON[state]

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'w-full px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all duration-200 flex items-center justify-between gap-2',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
        state === 'default' &&
          'hover:scale-[1.02] active:scale-[0.98]',
      )}
      style={
        state === 'default'  ? { background: 'rgba(255,255,255,0.92)', color: '#1e35bf', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' } :
        state === 'correct'  ? { background: '#22c55e', color: 'white', boxShadow: '0 2px 12px rgba(34,197,94,0.4)' } :
        state === 'wrong'    ? { background: '#ef4444', color: 'white', boxShadow: '0 2px 12px rgba(239,68,68,0.4)' } :
                               { background: 'rgba(255,255,255,0.15)', color: 'rgba(199,210,254,0.5)', cursor: 'not-allowed' }
      }
    >
      <span className="flex-1">{label}</span>
      {icon && (
        <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.25)' }}>
          {icon}
        </span>
      )}
    </button>
  )
}

import Image from 'next/image'

interface FlagCardProps {
  flagUrl: string
  countryName: string
  revealed: boolean
}

export default function FlagCard({ flagUrl, countryName, revealed }: FlagCardProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-full h-44 md:h-52 rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.35)', border: '2px solid rgba(255,255,255,0.25)' }}
      >
        <Image
          src={flagUrl}
          alt="Guess this flag"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {revealed && (
        <div
          className="px-4 py-1.5 rounded-full text-sm font-semibold animate-fade-in-up"
          style={{ background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.4)', color: '#34d399' }}
        >
          🌍 {countryName}
        </div>
      )}
    </div>
  )
}

import Image from 'next/image'

interface FlagCardProps {
  flagUrl: string
  countryName: string
  revealed: boolean
}

export default function FlagCard({ flagUrl, countryName, revealed }: FlagCardProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-sm h-48 md:h-56 rounded-xl overflow-hidden shadow-lg border border-border">
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
        <p className="text-sm text-muted-foreground">
          This is the flag of <span className="font-semibold text-foreground">{countryName}</span>
        </p>
      )}
    </div>
  )
}

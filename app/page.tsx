import Link from 'next/link'

const PILLS = ['🎯 10 Questions', '💡 3 Attempts Each', '🏆 100 Points Max']

export default function HomePage() {
  return (
    <main className="game-bg flex items-center justify-center relative overflow-hidden p-6">
      {/* Decorative circles */}
      <div className="game-circle" style={{ width: 320, height: 320, top: -80, right: -80 }} />
      <div className="game-circle" style={{ width: 220, height: 220, bottom: -40, left: -60 }} />
      <div className="game-circle" style={{ width: 140, height: 140, top: '38%', left: -50 }} />
      <div className="game-circle" style={{ width: 90,  height: 90,  bottom: '28%', right: -20 }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-7 text-center">

        {/* Icon */}
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center text-6xl animate-float animate-pulse-glow"
          style={{ background: '#f59e0b', boxShadow: '0 8px 32px rgba(245,158,11,0.45)' }}
        >
          🌍
        </div>

        {/* Heading */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <h1 className="text-5xl font-black text-white tracking-tight leading-none mb-3">
            Flag Quiz
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(199,210,254,0.9)' }}>
            Test your knowledge of the world&apos;s flags.<br />
            Can you score a perfect 100?
          </p>
        </div>

        {/* Pills */}
        <div
          className="flex gap-2 flex-wrap justify-center animate-fade-in-up"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          {PILLS.map((pill) => (
            <span
              key={pill}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div
          className="flex flex-col gap-3 w-full animate-fade-in-up"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <Link
            href="/game"
            className="w-full py-4 rounded-2xl text-center font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95 select-none"
            style={{ background: 'white', color: '#1e35bf', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
          >
            Start Game →
          </Link>
          <Link
            href="/leaderboard"
            className="w-full py-3.5 rounded-2xl text-center font-semibold text-white text-base transition-all duration-200 hover:opacity-90 active:scale-95 select-none"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.25)' }}
          >
            🏆 View Leaderboard
          </Link>
        </div>
      </div>
    </main>
  )
}

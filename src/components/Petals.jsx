import { useMemo } from 'react'

export default function Petals() {
  // Soft falling blue-white ethereal petals & silver stardust (NO EMOJIS)
  const items = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const type = i % 4 === 0 ? 'sparkle' : 'petal'
        return {
          id: i,
          type,
          left: Math.random() * 100,
          size: type === 'sparkle' ? 7 + Math.random() * 8 : 8 + Math.random() * 8,
          duration: 9 + Math.random() * 10,
          delay: -Math.random() * 16,
          opacity: 0.2 + Math.random() * 0.45,
        }
      }),
    []
  )

  return (
    <div className="petals" aria-hidden="true">
      {items.map((p) => {
        if (p.type === 'sparkle') {
          return (
            <span
              key={p.id}
              className="particle-sparkle"
              style={{
                left: `${p.left}%`,
                fontSize: `${p.size}px`,
                animationDuration: `${p.duration * 0.9}s`,
                animationDelay: `${p.delay}s`,
                opacity: p.opacity,
              }}
            >
              ✦
            </span>
          )
        }
        return (
          <span
            key={p.id}
            className="particle-petal"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 1.45}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity,
            }}
          />
        )
      })}
    </div>
  )
}

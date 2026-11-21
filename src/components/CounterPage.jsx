import { useEffect, useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from '../data/config'

const diff = (a, b) => {
  let y = b.getFullYear() - a.getFullYear(),
    m = b.getMonth() - a.getMonth(),
    d = b.getDate() - a.getDate(),
    h = b.getHours() - a.getHours(),
    mi = b.getMinutes() - a.getMinutes(),
    s = b.getSeconds() - a.getSeconds()
  if (s < 0) { s += 60; mi-- }
  if (mi < 0) { mi += 60; h-- }
  if (h < 0) { h += 24; d-- }
  if (d < 0) { d += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); m-- }
  if (m < 0) { m += 12; y-- }
  return { Tahun: y, Bulan: m, Hari: d, Jam: h, Menit: mi, Detik: s }
}

const QUOTE_WORDS = 'Setiap detik bersamamu adalah anugerah terindah, dan setiap langkah kita adalah cerita favoritku.'.split(' ')

export default function CounterPage() {
  const start = useMemo(() => new Date(config.startDate), [])
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const t = diff(start, now)
  const next = new Date(start)
  next.setFullYear(start.getFullYear() + t.Tahun + 1)
  const left = Math.ceil((next - now) / 864e5)
  const label = start.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })

  // Stagger container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.section
      className="counter-wrap"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Penghitung Hari Kasih Sayang"
    >
      {/* Top Luxury Kicker & Ornament (NO EMOJIS) */}
      <motion.div className="counter-crest" variants={itemVariants}>
        <span className="counter-crest-line" />
        <span className="counter-crest-badge">
          <span className="crest-star">✦</span> KISAH CINTA KITA <span className="crest-star">✦</span>
        </span>
        <span className="counter-crest-line" />
      </motion.div>

      {/* Animated Personal Romantic Quote */}
      <motion.blockquote className="counter-quote" variants={itemVariants}>
        “
        {QUOTE_WORDS.map((word, idx) => (
          <motion.span
            key={idx}
            className="quote-word"
            initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.4,
              delay: 0.25 + idx * 0.04,
              ease: 'easeOut',
            }}
          >
            {word}{' '}
          </motion.span>
        ))}
        ”
      </motion.blockquote>

      {/* Main Heading Area */}
      <motion.div className="counter-heading-wrap" variants={itemVariants}>
        <p className="counter-eyebrow">Sejak hari pertama kita melangkah bersama</p>
        <h2 className="script counter-hero-title">Kita Telah Bersama Selama</h2>
      </motion.div>

      {/* Luxury Glass Cards Counter Grid - White & Deep Navy */}
      <motion.div className="counter-grid" variants={itemVariants}>
        {Object.entries(t).map(([k, v]) => (
          <motion.div
            key={k}
            className="counter-card"
            whileHover={{ y: -5, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          >
            <div className="card-ambient-glow" />
            <div className="card-top-accent">
              <span className="accent-dot" />
            </div>

            <div className="counter-digits">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={v}
                  className="counter-num"
                  initial={{ y: -26, opacity: 0, scale: 0.85 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 26, opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                >
                  {String(v).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>

            <span className="counter-unit-label">{k}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Starting Date Badge & Milestone Countdown (NO EMOJIS, Vector Heart) */}
      <motion.div className="counter-footer-pills" variants={itemVariants}>
        <div className="since-pill">
          <svg className="pill-icon" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path
              d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span>Dimulai {label}</span>
        </div>

        <motion.div
          className="milestone-badge"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        >
          <svg className="badge-heart-svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
          <span className="badge-text">
            {left <= 0 || left >= 365
              ? 'Selamat Hari Jadi, Sayang! Cinta Kita Selamanya'
              : `${left} hari lagi menuju hari jadi ke-${t.Tahun + 1}`}
          </span>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

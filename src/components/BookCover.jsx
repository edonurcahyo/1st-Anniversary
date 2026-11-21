import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { config } from '../data/config'
import '../BookCover.css'

const LEN = config.password.length

// Corner filigree component for luxury silver & navy foil look
function CornerOrnament({ style }) {
  return (
    <svg className="bk-corner" style={style} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M3 45V12C3 7.02944 7.02944 3 12 3H45"
        stroke="url(#silverGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 40V16C10 12.6863 12.6863 10 16 10H40"
        stroke="url(#silverGrad)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
      <path
        d="M16 28V20C16 17.7909 17.7909 16 20 16H28"
        stroke="url(#silverGrad)"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      <circle cx="6" cy="6" r="2.5" fill="url(#silverGrad)" />
      <circle cx="45" cy="3" r="1.5" fill="url(#silverGrad)" />
      <circle cx="3" cy="45" r="1.5" fill="url(#silverGrad)" />
    </svg>
  )
}

export default function BookCover({ onUnlock }) {
  const [val, setVal] = useState('')
  const [wrong, setWrong] = useState(false)
  const [focus, setFocus] = useState(false)
  const [phase, setPhase] = useState('idle') // idle -> unlocking -> open
  const busy = useRef(false)
  const shake = useAnimation()

  // Ambient floating star sparkles in scene
  const ambientSparkles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        size: 8 + Math.random() * 12,
        char: ['✦', '✧', '•', '⋆', '◈'][Math.floor(Math.random() * 5)],
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 3,
      })),
    []
  )

  // Celebration burst when book unlocks (NO EMOJIS, pure geometric & starlight shapes)
  const burstParticles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => {
        const angle = (i / 50) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
        const dist = 140 + Math.random() * 260
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 40,
          rotate: Math.random() * 720 - 360,
          scale: 0.8 + Math.random() * 1.3,
          icon: ['✦', '✧', '•', '⋆', '◇', '○'][Math.floor(Math.random() * 6)],
          color: ['#ffffff', '#bfdbfe', '#93c5fd', '#60a5fa', '#e2e8f0'][
            Math.floor(Math.random() * 5)
          ],
          duration: 1.6 + Math.random() * 0.8,
        }
      }),
    []
  )

  const check = async () => {
    if (busy.current || val.length < LEN) return
    busy.current = true

    if (val === config.password) {
      setWrong(false)
      setPhase('unlocking')

      setTimeout(() => {
        setPhase('open')
      }, 700)
      return
    }

    setWrong(true)
    await shake.start({
      x: [0, -16, 16, -12, 12, -7, 7, -3, 0],
      rotate: [0, -2, 2, -1.5, 1.5, -1, 1, 0],
      transition: { duration: 0.6, ease: 'easeInOut' },
    })
    setTimeout(() => {
      setVal('')
      busy.current = false
    }, 450)
  }

  useEffect(() => {
    if (val.length === LEN) check()
  }, [val])

  const isUnlocking = phase === 'unlocking'
  const isOpen = phase === 'open'

  return (
    <div className="center bk-stage">
      {/* SVG Gradients for Silver Foil & Deep Royal Navy */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#dbeafe" />
            <stop offset="65%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="navyHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0a192f" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating Ambient Sparkles around scene */}
      <div className="bk-ambient" aria-hidden="true">
        {ambientSparkles.map((sp) => (
          <motion.span
            key={sp.id}
            className="bk-ambient-sparkle"
            style={{
              left: `calc(50% + ${sp.x}vw)`,
              top: `calc(50% + ${sp.y}vh)`,
              fontSize: `${sp.size}px`,
            }}
            animate={{
              opacity: [0.15, 0.85, 0.15],
              scale: [0.8, 1.3, 0.8],
              y: [0, -15, 0],
            }}
            transition={{
              duration: sp.duration,
              delay: sp.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {sp.char}
          </motion.span>
        ))}
      </div>

      {/* 3D Book Scene */}
      <motion.div
        className="bk-container"
        animate={isOpen ? { scale: 1.04, y: -4 } : { y: [0, -10, 0] }}
        transition={isOpen ? { duration: 1.2 } : { repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        <motion.div
          className="bk-wrapper"
          animate={shake}
          initial={{ opacity: 0, scale: 0.88, rotateX: 20, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 20, stiffness: 120, duration: 0.9 }}
        >
          {/* Dynamic 3D Ground Shadow */}
          <motion.div
            className="bk-depth-shadow"
            animate={{
              scale: isOpen ? 1.15 : [1, 0.9, 1],
              opacity: isOpen ? 0.2 : [0.5, 0.3, 0.5],
            }}
            transition={isOpen ? { duration: 0.8 } : { repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          />

          {/* Sapphire Silk Ribbon Bookmark */}
          <motion.div
            className="bk-ribbon"
            animate={{ rotate: [0, 3, -2, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />

          {/* Book Inside Pages (revealed when opened) */}
          <div className="bk-inner-pages">
            <div className="bk-page-content">
              <span className="bk-silver-crest">✦ ◈ ✦</span>
              <p className="bk-page-script">{config.title}</p>
              <span className="bk-page-sub">Kisah Cinta & Kenangan Kita</span>
              <div className="bk-page-flourish">
                <i></i>
                <span>◈</span>
                <i></i>
              </div>
              <p className="bk-page-date">Desember 2025 — Selamanya</p>
            </div>
            {/* Inner sapphire light glow when opened */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="bk-inner-glow"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Book 3D Cover */}
          <motion.div
            className="bk-cover"
            animate={isOpen ? { rotateY: -172 } : {}}
            transition={{ duration: 1.8, ease: [0.45, 0.05, 0.15, 1] }}
            onAnimationComplete={() => {
              if (isOpen) {
                setTimeout(onUnlock, 450)
              }
            }}
          >
            {/* FRONT COVER - Deep Midnight Navy with Silver Foil */}
            <div className="bk-face bk-front">
              {/* Spine edge details */}
              <div className="bk-spine">
                <span className="bk-spine-rib" />
                <span className="bk-spine-rib" />
                <span className="bk-spine-rib" />
                <span className="bk-spine-title">OUR STORY</span>
                <span className="bk-spine-rib" />
                <span className="bk-spine-rib" />
              </div>
              <div className="bk-stitch" />

              {/* Shimmer Light Reflection Sweep */}
              <div className="bk-shimmer-sweep" />

              {/* Embossed Silver Foil Frame */}
              <div className="bk-ornament-frame">
                {/* 4 Corner Ornaments */}
                <CornerOrnament style={{ top: 5, left: 5 }} />
                <CornerOrnament style={{ top: 5, right: 5, transform: 'rotate(90deg)' }} />
                <CornerOrnament style={{ bottom: 5, right: 5, transform: 'rotate(180deg)' }} />
                <CornerOrnament style={{ bottom: 5, left: 5, transform: 'rotate(270deg)' }} />

                {/* Top filigree crest */}
                <div className="bk-top-crest">
                  <span className="bk-crest-line" />
                  <span className="bk-crest-diamond">◈</span>
                  <span className="bk-crest-star">✦</span>
                  <span className="bk-crest-diamond">◈</span>
                  <span className="bk-crest-line" />
                </div>

                {/* Center Medallion with Luminous Blue Heart */}
                <div className="bk-medallion-wrap">
                  <motion.div
                    className="bk-medallion-halo"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="bk-medallion-ring"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                  />
                  <motion.svg
                    className="bk-heart-emblem"
                    viewBox="0 0 64 64"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    aria-hidden="true"
                  >
                    <path
                      d="M32 58C10 43 4 30 4 20a14 14 0 0 1 28-3 14 14 0 0 1 28 3c0 10-6 23-28 38Z"
                      fill="url(#blueGlow)"
                      stroke="url(#silverGrad)"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M32 48C17 38 13 29 13 22a9 9 0 0 1 19-2 9 9 0 0 1 19 2c0 7-4 16-19 26Z"
                      fill="url(#navyHeartGrad)"
                      stroke="url(#silverGrad)"
                      strokeWidth="1"
                    />
                    <path
                      d="M26 18c-3 1-5 4-5 7"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </motion.svg>
                </div>

                {/* Book Titles */}
                <div className="bk-header-group">
                  <span className="bk-volume-tag">SPECIAL EDITION • 1ST ANNIVERSARY</span>
                  <h1 className="bk-title">{config.title}</h1>
                  <p className="bk-subtitle">Sebuah Cerita Cinta Abadi</p>
                </div>

                {/* Decorative Divider */}
                <div className="bk-divider">
                  <span className="bk-divider-line" />
                  <span className="bk-divider-symbol">◈</span>
                  <span className="bk-divider-line" />
                </div>

                {/* Password Prompt Form */}
                <div className="bk-action-area">
                  <p className="bk-hint-text">
                    <svg className="bk-key-vector-icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <path d="M21 2l-2 2m-1.5 1.5L14 9l-2-2-4 4 1.5 1.5L8 14l-1.5-1.5L4 15l2 2-3 3 1 1 3-3 2 2 2.5-2.5L15 18l4-4 3.5-3.5a5 5 0 0 0-7-7L14 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{config.hint}</span>
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      check()
                    }}
                    className="bk-form"
                  >
                    <label className="bk-code-row" aria-label="Masukkan tanggal rahasia">
                      <input
                        className="bk-real-input"
                        value={val}
                        autoFocus
                        autoComplete="off"
                        inputMode="numeric"
                        maxLength={LEN}
                        aria-label="Kode Rahasia"
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        onChange={(e) =>
                          !busy.current &&
                          setVal(e.target.value.replace(/\D/g, '').slice(0, LEN))
                        }
                      />
                      {Array.from({ length: LEN }, (_, idx) => {
                        const isFilled = Boolean(val[idx])
                        const isCurrent = focus && idx === val.length
                        return (
                          <motion.div
                            key={idx}
                            className={`bk-digit-box ${isFilled ? 'filled' : ''} ${
                              isCurrent ? 'active' : ''
                            } ${wrong ? 'error' : ''}`}
                            animate={
                              isFilled
                                ? { scale: [1.2, 1], y: [2, 0] }
                                : isCurrent
                                ? { y: [-2, 0, -2] }
                                : {}
                            }
                            transition={{ duration: 0.2 }}
                          >
                            <span className="bk-digit-char">{val[idx] || ''}</span>
                            {!val[idx] && isCurrent && <span className="bk-caret" />}
                          </motion.div>
                        )
                      })}
                    </label>

                    {/* Unlock Key Button */}
                    <motion.button
                      type="submit"
                      className={`bk-unlock-btn ${isUnlocking ? 'unlocking' : ''}`}
                      disabled={phase !== 'idle'}
                      aria-label="Buka Cerita Cinta Kita"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      animate={
                        isUnlocking
                          ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] }
                          : {}
                      }
                      transition={{ duration: 0.4 }}
                    >
                      <span className="bk-btn-halo" />
                      <svg
                        className="bk-key-svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        aria-hidden="true"
                      >
                        <motion.path
                          d="M7 11V7a5 5 0 0 1 10 0v4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          animate={isUnlocking || isOpen ? { y: -4, opacity: 0.8 } : { y: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <rect x="4.5" y="11" width="15" height="10" rx="3" fill="currentColor" />
                        <circle cx="12" cy="15.5" r="1.5" fill="#0f172a" />
                        <path
                          d="M12 17v2"
                          stroke="#0f172a"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.button>
                  </form>

                  {/* Feedback Message (NO EMOJIS) */}
                  <div className="bk-status-feedback">
                    <AnimatePresence mode="wait">
                      {wrong ? (
                        <motion.p
                          key="err"
                          className="bk-err-msg"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                        >
                          ✦ Masa kamu lupa tanggal kita? Coba diingat lagi ya.
                        </motion.p>
                      ) : isUnlocking ? (
                        <motion.p
                          key="unlock"
                          className="bk-success-msg"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          ✦ Terbuka dengan penuh cinta...
                        </motion.p>
                      ) : (
                        <p className="bk-sub-instruction">Masukkan 6 angka</p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK OF FRONT COVER */}
            <div className="bk-face bk-back">
              <div className="bk-back-texture" />
              <div className="bk-back-ornament">
                <span>◈</span>
                <p>Kisah kita yang abadi</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Dramatic Unlock Particle Burst (NO EMOJIS) */}
      <AnimatePresence>
        {isOpen &&
          burstParticles.map((pt) => (
            <motion.span
              key={pt.id}
              className="bk-burst-particle"
              style={{
                fontSize: `${pt.scale * 16}px`,
                color: pt.color,
                textShadow: `0 0 10px ${pt.color}aa`,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
              animate={{
                x: pt.x,
                y: pt.y,
                opacity: 0,
                scale: pt.scale * 1.5,
                rotate: pt.rotate,
              }}
              transition={{
                duration: pt.duration,
                delay: 0.15,
                ease: [0.15, 0.85, 0.35, 1],
              }}
            >
              {pt.icon}
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  )
}

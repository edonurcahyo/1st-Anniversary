import { motion } from 'framer-motion'

// Menu items with clean vector icons and Roman numeral chapter tags (NO EMOJIS)
const menuItems = [
  {
    key: 'letter',
    title: 'Surat Untukmu',
    subtitle: 'Kata hati terdalam yang tersimpan',
    tag: 'Chapter 01',
    badge: 'I',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="13" r="1.8" fill="currentColor" opacity="0.7" />
      </svg>
    ),
  },
  {
    key: 'album',
    title: 'Album Kenangan',
    subtitle: 'Galeri momen manis perjalanan kita',
    tag: 'Chapter 02',
    badge: 'II',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="8.5" cy="9.5" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M21 16l-5-5-8 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 15l2.5-2.5L21 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'reasons',
    title: 'Alasan Aku Sayang',
    subtitle: 'Hal-hal kecil yang membuatku jatuh cinta',
    tag: 'Chapter 03',
    badge: 'III',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 7.5c.8-1 2.2-1.2 3.2-.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'dates',
    title: 'Dating Wishlist',
    subtitle: 'Daftar impian & petualangan kita',
    tag: 'Chapter 04',
    badge: 'IV',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 3v4M17 3v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 14.5l2 2 4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function MenuIcons({ go }) {
  return (
    <nav className="chapter-nav" aria-label="Menu Bab Cerita Cinta">
      <div className="chapter-grid">
        {menuItems.map((item, idx) => (
          <motion.button
            key={item.key}
            className="chapter-card"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.35 + idx * 0.1,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => go(item.key)}
            aria-label={`${item.title} - ${item.subtitle}`}
          >
            {/* Shimmer sweep effect on card */}
            <span className="card-shimmer" />

            {/* Top row: Chapter Tag & Clean Numeral Badge */}
            <div className="chapter-card-header">
              <span className="chapter-tag">{item.tag}</span>
              <span className="chapter-badge">{item.badge}</span>
            </div>

            {/* Center Icon with Ring */}
            <div className="chapter-icon-wrap">
              <span className="icon-glow-ring" />
              <motion.div
                className="chapter-icon-svg"
                animate={{ y: [0, -3, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + idx * 0.4,
                  ease: 'easeInOut',
                }}
              >
                {item.icon}
              </motion.div>
            </div>

            {/* Text details */}
            <div className="chapter-card-body">
              <h3 className="chapter-title">{item.title}</h3>
              <p className="chapter-desc">{item.subtitle}</p>
            </div>

            {/* Action Indicator */}
            <div className="chapter-footer">
              <span className="chapter-action-text">Buka Halaman</span>
              <svg className="action-arrow" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>
    </nav>
  )
}

import { motion } from 'framer-motion'

const menuItems = [
  { key: 'letter', title: 'Surat Untukmu', tag: 'Chapter 01', page: 2 },
  { key: 'album', title: 'Album Kenangan', tag: 'Chapter 02', page: 3 },
  { key: 'reasons', title: 'Alasan Aku Sayang', tag: 'Chapter 03', page: 4 },
  { key: 'dates', title: 'Dating Wishlist', tag: 'Chapter 04', page: 5 },
]

export default function MenuIcons({ go }) {
  return (
    <nav className="chapter-nav" aria-label="Daftar Isi Cerita Cinta">
      <h2 className="chapter-nav-title">Daftar Isi</h2>
      <ol className="chapter-grid">
        {menuItems.map((item, idx) => (
          <li key={item.key} className="chapter-item">
            <motion.button
              type="button"
              className="chapter-entry"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + idx * 0.08,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => go(item.key)}
              aria-label={`Buka ${item.tag}: ${item.title}, halaman ${item.page}`}
            >
              <span className="chapter-label">{item.tag}: {item.title}</span>
              <span className="chapter-leader" aria-hidden="true" />
              <span className="chapter-page">Hal. {item.page}</span>
              <svg
                className="chapter-entry-icon"
                viewBox="0 0 16 16"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M3 8h9m-4-4 4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

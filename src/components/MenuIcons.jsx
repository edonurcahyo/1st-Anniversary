import { motion } from 'framer-motion'

const menuItems = [
  { key: 'beginning', title: 'How It All Began', subtitle: 'Dari sebuah chat biasa, menjadi cerita yang luar biasa.', tag: 'Chapter 01', page: 2 },
  { key: 'letter', title: 'Surat Untukmu', subtitle: 'Kata-kata yang tak sempat terucap lewat lisan.', tag: 'Chapter 02', page: 3 },
  { key: 'album', title: 'Our Memory Lane', subtitle: 'Momen yang tertangkap kamera, tersimpan selamanya di kenangan.', tag: 'Chapter 03', page: 4 },
  { key: 'reasons', title: '100 Reasons Why', subtitle: 'Seratus alasan kecil untuk tetap memilihmu setiap hari.', tag: 'Chapter 04', page: 5 },
  { key: 'playlist', title: 'Our Playlist', subtitle: 'Nada yang selalu mengingatkanku padamu.', tag: 'Chapter 05', page: 6 },
  { key: 'dates', title: 'Dating Wishlist', subtitle: 'Banyak hal yang menanti untuk kita jelajahi bersama.', tag: 'Chapter 06', page: 7 },
  { key: 'future', title: 'To The Future', subtitle: 'Mari melangkah lebih jauh, selamanya.', tag: 'Chapter 07', page: 8 },
]

const icons = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z" />
    </>
  ),
  envelope: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h4l1.5-2h5L16 8h4a1 1 0 0 1 1 1v10H3V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  heart: <path d="M20.8 8.8c0 5-8.8 10-8.8 10s-8.8-5-8.8-10A4.8 4.8 0 0 1 12 6.4a4.8 4.8 0 0 1 8.8 2.4z" />,
  music: (
    <>
      <path d="M14 18V5l7-1v13" />
      <ellipse cx="10" cy="18" rx="4" ry="3" />
      <ellipse cx="18" cy="17" rx="3" ry="2.5" />
      <path d="m14 8 7-1" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  hourglass: (
    <>
      <path d="M6 3h12M6 21h12M7 3c0 5 5 5 5 9s-5 4-5 9m10-18c0 5-5 5-5 9s5 4 5 9" />
      <path d="M9 17h6" />
    </>
  ),
}

const iconByChapter = {
  beginning: 'compass',
  letter: 'envelope',
  album: 'camera',
  reasons: 'heart',
  playlist: 'music',
  dates: 'pin',
  future: 'hourglass',
}

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
            >
              <span className="chapter-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" focusable="false">
                  {icons[iconByChapter[item.key]]}
                </svg>
              </span>
              <span className="chapter-copy">
                <span className="chapter-kicker">{item.tag}</span>
                <span className="chapter-label">{item.title}</span>
                <span className="chapter-subtext">{item.subtitle}</span>
              </span>
              <span className="chapter-leader" aria-hidden="true" />
              <span className="chapter-page">Hal. {item.page}</span>
            </motion.button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

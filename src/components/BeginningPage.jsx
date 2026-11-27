import { motion } from 'framer-motion'

const storyPrompts = [
  {
    title: 'Pertemuan pertama',
    prompt: 'Ceritakan tempat dan suasana saat kalian pertama kali bertemu.',
  },
  {
    title: 'Kesan pertama',
    prompt: 'Apa yang paling kamu ingat dari kesan pertama waktu itu?',
  },
  {
    title: 'Awal cerita',
    prompt: 'Dari sebuah sapaan biasa, menjadi cerita yang luar biasa.',
  },
]

function PhotoPlaceholder({ index, title }) {
  return (
    <figure className="story-photo-placeholder">
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
        <rect x="4" y="7" width="24" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="m6 23 7-6 4 3 4-4 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <figcaption>Foto {String(index + 1).padStart(2, '0')} · {title}</figcaption>
    </figure>
  )
}

export default function BeginningPage({ back }) {
  return (
    <div className="page wide chapter-content-page">
      <header className="page-heading">
        <p className="eyebrow">Chapter 01 · Awal Mula</p>
        <h2 className="script hero sm">How It All Began</h2>
        <p className="chapter-page-subtitle">
          Dari sebuah sapaan biasa, menjadi cerita yang luar biasa.
        </p>
      </header>

      <ol className="beginning-story-list">
        {storyPrompts.map((story, index) => (
          <motion.li
            key={story.title}
            className="beginning-story-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
          >
            <PhotoPlaceholder index={index} title={story.title} />
            <div className="beginning-story-copy">
              <span className="beginning-story-index">Momen {String(index + 1).padStart(2, '0')}</span>
              <h3>{story.title}</h3>
              <p>{story.prompt}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      <p className="chapter-editor-note">
        Ruang foto dan ceritanya siap kamu lengkapi sendiri.
      </p>
      <button type="button" className="back-menu-btn" onClick={back}>
        Kembali ke Daftar Isi
      </button>
    </div>
  )
}

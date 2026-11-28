import { useState } from 'react'
import { motion } from 'framer-motion'
import { reasons, reasonsClosing } from '../data/reasons'

function Card({ text, n }) {
  const [f, setF] = useState(false)
  return (
    <motion.button
      type="button"
      className="flip"
      onClick={() => setF((flipped) => !flipped)}
      aria-pressed={f}
      initial={{ opacity: 0, y: 40, rotate: n % 2 ? 4 : -4 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: Math.min(n * 0.008, 0.32), type: 'spring' }}
      whileHover={{ y: -6 }}
    >
      <motion.div className="flip-in" animate={{ rotateY: f ? 180 : 0 }} transition={{ duration: 0.6 }}>
        <div className="face front"><span aria-hidden="true">♡</span>Alasan #{n + 1}</div>
        <div className="face back">{text}</div>
      </motion.div>
    </motion.button>
  )
}
export default function ReasonsPage({ back }) {
  return (
    <div className="page wide chapter-content-page">
      <button type="button" className="back-menu-btn reasons-back-btn" onClick={back}>
        Kembali ke Daftar Isi
      </button>

      <header className="page-heading">
        <p className="eyebrow">Chapter 04 · Hal-hal yang kusayang</p>
        <h2 className="script hero sm">100 Alasan Kenapa Aku Mencintaimu ♡</h2>
        <p className="chapter-page-subtitle">
          Untuk seseorang yang membuat hari-hariku terasa lebih indah.
        </p>
      </header>
      <p className="muted sm">Ketuk setiap kartu untuk membaca alasannya.</p>
      <div className="flips">
        {reasons.map((reason, index) => (
          <Card key={index} text={reason} n={index} />
        ))}
      </div>
      <section className="reasons-closing" aria-labelledby="reasons-closing-title">
        <h3 id="reasons-closing-title">Untuk halaman terakhir ♡</h3>
        {reasonsClosing.paragraphs.map((paragraph) => (
          <p key={paragraph}><em>{paragraph}</em></p>
        ))}
        <p className="reasons-closing-signoff">
          <strong>{reasonsClosing.signoff}</strong>
        </p>
      </section>
    </div>
  )
}

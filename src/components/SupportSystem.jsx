import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { support } from '../data/supportSystem'

export default function SupportSystem({ back }) {
  const [selected, setSelected] = useState(null)
  const opener = useRef(null)

  useEffect(() => {
    if (!selected) return undefined

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelected(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      opener.current?.focus()
    }
  }, [selected])

  return (
    <div className="page wide support-page">
      <motion.h2 className="script hero" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>Ini support system terbaikkuu ❤</motion.h2>
      <div className="support-gallery">
        {support.map((s, i) => (
          <motion.figure key={i} className="polaroid solo" initial={{ opacity: 0, y: 24, rotate: i % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ type: 'spring', damping: 18, delay: i * .08 }}>
            <i className="tape" />
            <button className="support-photo-button" type="button" aria-label={`Lihat foto penuh: ${s.caption}`}
              onClick={(event) => { opener.current = event.currentTarget; setSelected(s) }}>
              <img src={s.src} alt={s.caption} loading="lazy" decoding="async" onError={(e) => (e.currentTarget.style.opacity = 0.2)} />
            </button>
            <figcaption className="script date">{s.caption}</figcaption>
          </motion.figure>
        ))}
      </div>
      <button onClick={back}>Kembali ke menu</button>

      <AnimatePresence>
        {selected && (
          <motion.div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={`Foto penuh: ${selected.caption}`}
            onClick={(event) => { if (event.target === event.currentTarget) setSelected(null) }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.figure className="photo-lightbox-content" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }}>
              <button className="icon-button photo-lightbox-close" type="button" autoFocus aria-label="Tutup foto penuh" onClick={() => setSelected(null)}>×</button>
              <img src={selected.src} alt={selected.caption} decoding="async" />
              <figcaption>{selected.caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

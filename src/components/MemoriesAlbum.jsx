import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { memories } from '../data/memories'

const v = { in: (d) => ({ x: d * 320, opacity: 0, rotate: d * 12, scale: 0.9 }), mid: (i) => ({ x: 0, opacity: 1, rotate: i % 2 ? 2.5 : -2.5, scale: 1 }), out: (d) => ({ x: d * -320, opacity: 0, rotate: d * -12, scale: 0.9 }) }

const monthIndex = {
  januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
  juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11,
}

const parseIndonesianDate = (value) => {
  const [day, month, year] = value.toLowerCase().split(/\s+/)
  return new Date(Number(year), monthIndex[month] ?? 0, Number(day)).getTime()
}

export default function MemoriesAlbum({ back, next }) {
  const [[i, dir], set] = useState([0, 1])
  const [gallery, setGallery] = useState(false)
  const [selected, setSelected] = useState(null)
  const sortedMemories = useMemo(
    () => [...memories].sort((a, b) => parseIndonesianDate(a.date) - parseIndonesianDate(b.date)),
    [],
  )
  const last = i === memories.length
  const go = (d) => { const n = i + d; if (n >= 0 && n <= memories.length) set([n, d]) }
  const m = memories[i]

  useEffect(() => {
    if (!gallery && selected === null) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') selected !== null ? setSelected(null) : setGallery(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [gallery, selected])

  return (
    <>
      <div className="page album-page">
        <header className="page-heading">
          <p className="eyebrow">Cerita kita</p>
          <h2 className="script hero sm">Album Kenangan</h2>
        </header>
        <div className="stage">
          <AnimatePresence custom={dir} mode="wait">
            <motion.article key={i} custom={last ? 1 : i} className="polaroid" variants={{ ...v, in: () => v.in(dir), out: () => v.out(dir), mid: () => v.mid(i) }}
              initial="in" animate="mid" exit="out" transition={{ type: 'spring', damping: 20, stiffness: 140 }}
              drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, o) => { if (o.offset.x < -80) go(1); else if (o.offset.x > 80) go(-1) }}>
              <i className="tape" />
              {last ? (
                <div className="closing">
                  <p className="script big">Masih banyak cerita indah yang menunggu kita.</p>
                  <p>Apakah kamu mau lihat orang yang sangat spesial buat aku?</p>
                  <motion.button onClick={next} animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}>Lihat selanjutnya</motion.button>
                </div>
              ) : (<>
                <img src={m.src} alt={m.caption} draggable={false} loading="eager" decoding="async" onError={(e) => (e.currentTarget.style.opacity = 0.2)} />
                <time className="script date">{m.date}</time><p className="cap">{m.caption}</p>
              </>)}
            </motion.article>
          </AnimatePresence>
        </div>
        <p className="muted sm">Geser foto atau gunakan tombol navigasi · {Math.min(i + 1, memories.length)} / {memories.length}</p>
        <div className="album-actions">
          <button className="nav-arrow" aria-label="Foto sebelumnya" disabled={i === 0} onClick={() => go(-1)}>‹</button>
          <button className="gallery-button" onClick={() => setGallery(true)}>Lihat semua foto</button>
          <button className="nav-arrow" aria-label="Foto berikutnya" disabled={last} onClick={() => go(1)}>›</button>
        </div>
        <button className="text-button" onClick={back}>Kembali ke menu</button>
      </div>

      <AnimatePresence>
        {gallery && (
          <motion.div className="gallery-overlay" role="dialog" aria-modal="true" aria-label="Semua foto kenangan"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {selected === null ? (
              <motion.section className="gallery-panel" initial={{ y: 24, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: 0.97 }}>
                <header className="gallery-header">
                  <div><p className="eyebrow">Koleksi cerita</p><h3>Semua Kenangan</h3></div>
                  <button className="icon-button" aria-label="Tutup album" autoFocus onClick={() => setGallery(false)}>×</button>
                </header>
                <div className="memory-grid">
                  {sortedMemories.map((memory, index) => (
                    <motion.button key={memory.src} className="memory-card" onClick={() => setSelected(index)}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .18, delay: Math.min(index * .025, .12) }}>
                      <img src={memory.src} alt={memory.caption} loading="lazy" />
                      <span><time>{memory.date}</time><strong>{memory.caption}</strong></span>
                    </motion.button>
                  ))}
                </div>
              </motion.section>
            ) : (
              <motion.section className="detail-panel" key={sortedMemories[selected].src}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
                <button className="icon-button detail-close" aria-label="Kembali ke semua foto" autoFocus onClick={() => setSelected(null)}>×</button>
                <div className="detail-image"><img src={sortedMemories[selected].src} alt={sortedMemories[selected].caption} /></div>
                <div className="detail-copy">
                  <time>{sortedMemories[selected].date}</time>
                  <h3>{sortedMemories[selected].caption}</h3>
                  <p>{sortedMemories[selected].description || sortedMemories[selected].caption}</p>
                </div>
              </motion.section>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

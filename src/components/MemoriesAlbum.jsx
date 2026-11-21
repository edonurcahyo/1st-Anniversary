import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { memories } from '../data/memories'

const v = {
  in: (d) => ({ x: d * 320, opacity: 0, rotate: d * 10, scale: 0.92 }),
  mid: (i) => ({ x: 0, opacity: 1, rotate: i % 2 ? 2 : -2, scale: 1 }),
  out: (d) => ({ x: d * -320, opacity: 0, rotate: d * -10, scale: 0.92 }),
}

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
  const [detailIndex, setDetailIndex] = useState(null) // index of memory being viewed in detail

  const sortedMemories = useMemo(
    () => [...memories].sort((a, b) => parseIndonesianDate(a.date) - parseIndonesianDate(b.date)),
    []
  )

  const last = i === memories.length
  const go = (d) => {
    const n = i + d
    if (n >= 0 && n <= memories.length) set([n, d])
  }
  const m = memories[i]

  // Keyboard accessibility
  useEffect(() => {
    if (!gallery && detailIndex === null) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (detailIndex !== null) setDetailIndex(null)
        else setGallery(false)
      } else if (event.key === 'ArrowRight' && detailIndex !== null) {
        setDetailIndex((prev) => (prev < sortedMemories.length - 1 ? prev + 1 : 0))
      } else if (event.key === 'ArrowLeft' && detailIndex !== null) {
        setDetailIndex((prev) => (prev > 0 ? prev - 1 : sortedMemories.length - 1))
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [gallery, detailIndex, sortedMemories.length])

  // Open detail for the current slide memory
  const openDetailFromSlide = () => {
    if (!m) return
    const idx = sortedMemories.findIndex((item) => item.src === m.src)
    setDetailIndex(idx !== -1 ? idx : 0)
  }

  const activeDetail = detailIndex !== null ? sortedMemories[detailIndex] : null

  return (
    <>
      <div className="page album-page">
        <header className="page-heading">
          <p className="eyebrow">Koleksi kenangan kita</p>
          <h2 className="script hero sm">Album Kenangan</h2>
        </header>

        {/* Main Stage Polaroid Slider */}
        <div className="stage">
          <AnimatePresence custom={dir} mode="wait">
            <motion.article
              key={i}
              custom={last ? 1 : i}
              className="polaroid"
              variants={{ ...v, in: () => v.in(dir), out: () => v.out(dir), mid: () => v.mid(i) }}
              initial="in"
              animate="mid"
              exit="out"
              transition={{ type: 'spring', damping: 20, stiffness: 140 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, o) => {
                if (o.offset.x < -80) go(1)
                else if (o.offset.x > 80) go(-1)
              }}
            >
              <i className="tape" />
              {last ? (
                <div className="closing">
                  <p className="script big">Masih banyak cerita indah yang menunggu kita.</p>
                  <p>Apakah kamu mau lihat orang yang sangat spesial buat aku?</p>
                  <motion.button
                    type="button"
                    onClick={next}
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                  >
                    Mauu
                  </motion.button>
                </div>
              ) : (
                <>
                  {/* Clickable Image Container to view full uncropped photo and story */}
                  <button
                    type="button"
                    className="polaroid-photo-button"
                    onClick={openDetailFromSlide}
                    aria-label={`Buka foto penuh: ${m.caption}`}
                  >
                    <div className="polaroid-img-frame">
                      <img
                        src={m.src}
                        alt={m.caption}
                        draggable={false}
                        loading="eager"
                        decoding="async"
                        onError={(e) => (e.currentTarget.style.opacity = '0.3')}
                      />
                    </div>
                  </button>

                  <time className="script date">{m.date}</time>
                  <p className="cap">{m.caption}</p>
                </>
              )}
            </motion.article>
          </AnimatePresence>
        </div>

        <p className="muted sm">
          Ketuk foto untuk detail · Geser foto atau gunakan navigasi · {Math.min(i + 1, memories.length)} / {memories.length}
        </p>

        {/* Action Controls */}
        <div className="album-actions">
          <button
            type="button"
            className="nav-arrow"
            aria-label="Foto sebelumnya"
            disabled={i === 0}
            onClick={() => go(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="gallery-button"
            onClick={() => setGallery(true)}
          >
            Lihat Semua Foto
          </button>
          <button
            type="button"
            className="nav-arrow"
            aria-label="Foto berikutnya"
            disabled={last}
            onClick={() => go(1)}
          >
            ›
          </button>
        </div>

        <button type="button" className="text-button" onClick={back}>
          Kembali ke Menu
        </button>
      </div>

      {/* Gallery Grid Modal */}
      <AnimatePresence>
        {gallery && (
          <motion.div
            className="gallery-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Semua foto kenangan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setGallery(false)
            }}
          >
            <motion.section
              className="gallery-panel"
              initial={{ y: 24, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 24, scale: 0.97 }}
            >
              <header className="gallery-header">
                <div>
                  <p className="eyebrow">Koleksi cerita kita</p>
                  <h3>Semua Kenangan</h3>
                </div>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Tutup album"
                  autoFocus
                  onClick={() => setGallery(false)}
                >
                  ×
                </button>
              </header>

              <div className="memory-grid">
                {sortedMemories.map((memory, index) => (
                  <motion.button
                    key={memory.src}
                    type="button"
                    className="memory-card"
                    onClick={() => {
                      setDetailIndex(index)
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: Math.min(index * 0.03, 0.15),
                    }}
                  >
                    <div className="memory-card-img-wrap">
                      <img
                        src={memory.src}
                        alt={memory.caption}
                        loading="lazy"
                      />
                    </div>
                    <span>
                      <time>{memory.date}</time>
                      <strong>{memory.caption}</strong>
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Photo & Story Detail Lightbox Modal (Uncropped, Full Quality) */}
      <AnimatePresence>
        {activeDetail && (
          <motion.div
            className="gallery-overlay detail-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`Detail kenangan: ${activeDetail.caption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setDetailIndex(null)
            }}
          >
            <motion.section
              className="detail-panel"
              key={activeDetail.src}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Close Button */}
              <button
                type="button"
                className="icon-button detail-close"
                aria-label="Tutup foto penuh"
                autoFocus
                onClick={() => setDetailIndex(null)}
              >
                ×
              </button>

              {/* Uncropped Photo Container */}
              <div className="detail-image">
                <img
                  src={activeDetail.src}
                  alt={activeDetail.caption}
                  loading="eager"
                />
              </div>

              {/* Story Description & Navigation */}
              <div className="detail-copy">
                <div className="detail-meta-row">
                  <time className="detail-date">{activeDetail.date}</time>
                  <span className="detail-counter">
                    {detailIndex + 1} dari {sortedMemories.length}
                  </span>
                </div>

                <h3 className="detail-title">{activeDetail.caption}</h3>

                <div className="detail-desc-box">
                  <p>{activeDetail.description || activeDetail.caption}</p>
                </div>

                {/* Next / Previous Controls inside Detail View */}
                <div className="detail-nav-row">
                  <button
                    type="button"
                    className="detail-nav-btn"
                    aria-label="Foto sebelumnya"
                    onClick={() =>
                      setDetailIndex((prev) =>
                        prev > 0 ? prev - 1 : sortedMemories.length - 1
                      )
                    }
                  >
                    <span>‹ Sebelumnya</span>
                  </button>

                  <button
                    type="button"
                    className="detail-nav-btn"
                    aria-label="Foto berikutnya"
                    onClick={() =>
                      setDetailIndex((prev) =>
                        prev < sortedMemories.length - 1 ? prev + 1 : 0
                      )
                    }
                  >
                    <span>Berikutnya ›</span>
                  </button>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

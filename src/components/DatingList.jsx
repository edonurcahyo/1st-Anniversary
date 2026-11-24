import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const defaultDates = [
  { id: 1, title: 'First Date', date: 'Selasa, 17 Februari 2026', done: true },
  { id: 2, title: 'Movie Date', date: 'Selasa, 17 Februari 2026', done: true },
  { id: 3, title: 'Zoo Date', date: 'Selasa, 23 Mei 2026', done: true },
  { id: 4, title: 'Perpus Date', date: 'Rabu, 3 Juni 2026', done: true },
  { id: 5, title: 'Buka Puasa Bareng', date: 'Kamis, 12 November 2026', done: true },
  { id: 6, title: 'Photobooth', date: 'Kamis, 26 November 2026 ', done: false },
  { id: 7, title: 'GYM Date', date: 'Belum dijadwalkan', done: false },
  { id: 8, title: 'PS Date', date: 'Belum dijadwalkan', done: false },
  { id: 9, title: 'Ke Malang?', date: 'Belum dijadwalkan', done: false },
  { id: 10, title: 'Naik Gunung?', date: 'Belum dijadwalkan', done: false },
]

export default function DatingList({ back }) {
  // Always use title & date from defaultDates, only preserve checkbox 'done' status
  const [dates, setDates] = useState(() => {
    try {
      const saved =
        localStorage.getItem('anniversary-dating-v2') ||
        localStorage.getItem('anniversary-dates')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const savedMap = new Map(parsed.map((item) => [item.id, item]))
          // Enforce defaultDates title & date, only adopt saved 'done' status
          return defaultDates.map((def) => {
            const savedItem = savedMap.get(def.id)
            return {
              ...def,
              done: typeof savedItem?.done === 'boolean' ? savedItem.done : def.done,
            }
          })
        }
      }
    } catch (e) {
      console.warn('Error reading anniversary-dates from localStorage:', e)
    }
    return defaultDates
  })

  const [filter, setFilter] = useState('Semua')

  // Keep localStorage in sync
  useEffect(() => {
    try {
      localStorage.setItem('anniversary-dating-v2', JSON.stringify(dates))
      localStorage.setItem('anniversary-dates', JSON.stringify(dates))
    } catch (e) {
      console.warn('Error saving anniversary-dates:', e)
    }
  }, [dates])

  const completed = dates.filter((item) => item.done).length
  const progress = dates.length ? Math.round((completed / dates.length) * 100) : 0

  const visibleDates = useMemo(
    () =>
      dates.filter((item) => {
        if (filter === 'Selesai') return item.done
        if (filter === 'Belum') return !item.done
        return true
      }),
    [dates, filter]
  )

  const toggle = (id) => {
    setDates((items) =>
      items.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    )
  }

  const resetToDefault = () => {
    setDates(defaultDates)
    try {
      localStorage.setItem('anniversary-dating-v2', JSON.stringify(defaultDates))
      localStorage.setItem('anniversary-dates', JSON.stringify(defaultDates))
    } catch {}
  }

  return (
    <div className="page dates-page">
      {/* Header */}
      <header className="page-heading">
        <p className="eyebrow">Daftar perjalanan & impian kita</p>
        <h2 className="script hero sm">Dating Wishlist</h2>
      </header>

      {/* Progress Card - White & Deep Navy Theme (NO EMOJIS) */}
      <motion.section
        className="progress-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="progress-ring"
          style={{ '--progress': `${progress * 3.6}deg` }}
          aria-label={`Kemajuan kencan: ${progress}%`}
        >
          <div>
            <strong>{progress}%</strong>
            <span>terlaksana</span>
          </div>
        </div>

        <div className="progress-copy">
          <span className="progress-eyebrow">Rencana Kebersamaan</span>
          <strong>
            {completed} dari {dates.length} impian tercapai
          </strong>
          <p>
            {completed === dates.length
              ? 'Semua rencana indah telah kita lalui bersama.'
              : 'Masih banyak petualangan manis yang menanti kita.'}
          </p>
        </div>
      </motion.section>

      {/* Filter Tabs */}
      <div className="date-filters" role="group" aria-label="Filter status kencan">
        {['Semua', 'Belum', 'Selesai'].map((name) => (
          <button
            key={name}
            type="button"
            className={filter === name ? 'active' : ''}
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
            {name === 'Semua' && ` (${dates.length})`}
            {name === 'Belum' && ` (${dates.length - completed})`}
            {name === 'Selesai' && ` (${completed})`}
          </button>
        ))}
      </div>

      {/* Dating Checklist List */}
      <motion.div className="date-list" layout>
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleDates.map((item, index) => (
            <motion.label
              key={item.id}
              className={`date-item ${item.done ? 'done' : ''}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.03, duration: 0.25 }}
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggle(item.id)}
                aria-label={`Tandai ${item.title}`}
              />
              <span className="custom-check" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="16" height="16">
                  <path
                    d="M4 10l4.5 4.5L16 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="date-item-copy">
                <strong>{item.title}</strong>
                <time>{item.date}</time>
              </span>
              <span className="date-item-status-tag">
                {item.done ? 'Selesai' : 'Rencana'}
              </span>
            </motion.label>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State Fallback */}
      {visibleDates.length === 0 && (
        <div className="empty-state">
          <p>Belum ada rencana kencan di kategori {filter}.</p>
        </div>
      )}

      {/* Footer Navigation Buttons */}
      <div className="dates-footer-actions">
        <button type="button" className="text-button reset-dates-btn" onClick={resetToDefault}>
          Muat Ulang Daftar Awal
        </button>
        <button type="button" className="back-menu-btn" onClick={back}>
          Kembali ke Menu
        </button>
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'

export default function PlaylistPage({ tracks, currentTrack, isPlaying, onSelectTrack, back }) {
  return (
    <div className="page chapter-content-page playlist-page">
      <header className="page-heading">
        <p className="eyebrow">Chapter 05 · Lagu Kita</p>
        <h2 className="script hero sm">Our Playlist</h2>
        <p className="chapter-page-subtitle">Nada yang selalu mengingatkanku padamu.</p>
      </header>

      <section className="playlist-deck" aria-label="Pemutar lagu kita">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true">
          <path d="M13 24V7l14-3v17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 11 27 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <ellipse cx="9" cy="25" rx="4" ry="3" stroke="currentColor" strokeWidth="1.7" />
          <ellipse cx="23" cy="22" rx="4" ry="3" stroke="currentColor" strokeWidth="1.7" />
        </svg>
        <div>
          <p>Soundtrack cerita kita</p>
          <strong>{currentTrack.title}</strong>
        </div>
        <span className={`playlist-playing-indicator${isPlaying ? ' is-playing' : ''}`} aria-hidden="true">
          <i /><i /><i /><i />
        </span>
      </section>

      <ol className="playlist-track-list" aria-label="Daftar lagu">
        {tracks.map((track, index) => {
          const isCurrent = currentTrack.id === track.id
          return (
            <li key={track.id}>
              <motion.button
                type="button"
                className={`playlist-track${isCurrent ? ' is-current' : ''}`}
                aria-label={`${isCurrent && isPlaying ? 'Jeda' : 'Putar'} ${track.title}`}
                aria-pressed={isCurrent && isPlaying}
                onClick={() => onSelectTrack(track)}
                whileTap={{ scale: 0.99 }}
              >
                <span className="playlist-track-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="playlist-track-copy">
                  <strong>{track.title}</strong>
                  <small>{isCurrent ? (isPlaying ? 'Sedang diputar · tekan untuk jeda' : 'Dipilih · tekan untuk putar') : 'Putar lagu'}</small>
                </span>
                <span className="playlist-track-action" aria-hidden="true">{isCurrent && isPlaying ? 'Ⅱ' : '▶'}</span>
              </motion.button>
            </li>
          )
        })}
      </ol>

      <p className="chapter-editor-note">
        Pilih lagu untuk memutarnya
      </p>
      <button type="button" className="back-menu-btn" onClick={back}>
        Kembali ke Daftar Isi
      </button>
    </div>
  )
}

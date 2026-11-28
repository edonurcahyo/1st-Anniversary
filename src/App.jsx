import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BookCover from './components/BookCover'
import CounterPage from './components/CounterPage'
import MenuIcons from './components/MenuIcons'
import LetterPage from './components/LetterPage'
import MemoriesAlbum from './components/MemoriesAlbum'
import ReasonsPage from './components/ReasonsPage'
import SupportSystem from './components/SupportSystem'
import MusicPlayer from './components/MusicPlayer'
import Petals from './components/Petals'
import DatingList from './components/DatingList'
import Preloader from './components/Preloader'
import BeginningPage from './components/BeginningPage'
import PlaylistPage from './components/PlaylistPage'
import FuturePage from './components/FuturePage'
import { playlist } from './data/playlist'

export default function App() {
  const [view, setView] = useState('cover')
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(playlist[0])
  const audioRef = useRef(null)

  const home = () => setView('home')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1700)
    return () => clearTimeout(timer)
  }, [])

  // Dipanggil BookCover saat buku berhasil dibuka.
  // Catatan: play() sebaiknya dipicu dari event klik user agar tidak diblokir.
  const handleUnlock = async () => {
    setView('home')
    try {
      await audioRef.current?.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('Musik gagal diputar:', error)
    }
  }

  // Untuk lebih aman: pemicu play() dari klik tombol di BookCover
  const startMusic = async () => {
    try {
      await audioRef.current?.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('Musik gagal diputar:', error)
    }
  }

  const toggleMusic = async () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Musik gagal diputar:', error)
        setIsPlaying(false)
      }
    }
  }

  const selectTrack = async (track) => {
    if (!audioRef.current) return
    if (currentTrack.id === track.id) {
      await toggleMusic()
      return
    }

    audioRef.current.pause()
    audioRef.current.src = track.src
    setCurrentTrack(track)

    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('Musik gagal diputar:', error)
      setIsPlaying(false)
    }
  }

  return (
    <>
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

      {/* Satu-satunya <audio> di aplikasi — selalu ada di DOM */}
      <audio
        ref={audioRef}
        src={playlist[0].src}
        loop
        preload="auto"
      />

      <div className="bg" aria-hidden><i className="blob b1" /><i className="blob b2" /><i className="blob b3" /></div>
      {view !== 'album' && view !== 'support' && view !== 'home' && <Petals />}

      {view !== 'cover' && (
        <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} isHome={view === 'home'} />
      )}

      <AnimatePresence mode="wait">
        <motion.main className={view === 'home' ? 'home-main' : undefined} key={view} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28, ease: 'easeOut' }}>
          {view === 'cover' && (
            <BookCover onUnlock={handleUnlock} onBeforeUnlock={startMusic} />
          )}
          {view === 'beginning' && <BeginningPage back={home} />}
          {view === 'home' && (
            <div className="home-book-page">
              <span className="home-page-corner corner-top-left" aria-hidden="true" />
              <span className="home-page-corner corner-top-right" aria-hidden="true" />
              <span className="home-page-corner corner-bottom-left" aria-hidden="true" />
              <span className="home-page-corner corner-bottom-right" aria-hidden="true" />
              <header className="home-page-header">
                <h1>Our Story</h1>
                <p>Halaman 1: Awal Mula</p>
              </header>
              <div className="home-page-content">
                <CounterPage />
                <MenuIcons go={setView} />
              </div>
              <figure className="home-polaroid">
                <span className="polaroid-tape" aria-hidden="true" />
                <img src="/images/memories/pic1.jpeg" alt="Cuplikan foto kenangan kita" />
                <figcaption>kenangan kecil, cerita besar</figcaption>
              </figure>
            </div>
          )}
          {view === 'letter' && <LetterPage back={home} />}
          {view === 'album' && <MemoriesAlbum back={home} next={() => setView('support')} />}
          {view === 'reasons' && <ReasonsPage back={home} />}
          {view === 'playlist' && (
            <PlaylistPage
              tracks={playlist}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onSelectTrack={selectTrack}
              back={home}
            />
          )}
          {view === 'support' && <SupportSystem back={home} />}
          {view === 'dates' && <DatingList back={home} />}
          {view === 'future' && <FuturePage back={home} />}
        </motion.main>
      </AnimatePresence>
    </>
  )
}
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

export default function App() {
  const [view, setView] = useState('cover')
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
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

  return (
    <>
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

      {/* Satu-satunya <audio> di aplikasi — selalu ada di DOM */}
      <audio
        ref={audioRef}
        src="/audio/Sheila On 7 - Kita.mp3"
        loop
        preload="auto"
      />

      <div className="bg" aria-hidden><i className="blob b1" /><i className="blob b2" /><i className="blob b3" /></div>
      {view !== 'album' && view !== 'support' && <Petals />}

      {view !== 'cover' && (
        <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
      )}

      <AnimatePresence mode="wait">
        <motion.main key={view} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28, ease: 'easeOut' }}>
          {view === 'cover' && (
            <BookCover onUnlock={handleUnlock} onBeforeUnlock={startMusic} />
          )}
          {view === 'home' && <div className="center col"><CounterPage /><MenuIcons go={setView} /></div>}
          {view === 'letter' && <LetterPage back={home} />}
          {view === 'album' && <MemoriesAlbum back={home} next={() => setView('support')} />}
          {view === 'reasons' && <ReasonsPage back={home} />}
          {view === 'support' && <SupportSystem back={home} />}
          {view === 'dates' && <DatingList back={home} />}
        </motion.main>
      </AnimatePresence>
    </>
  )
}
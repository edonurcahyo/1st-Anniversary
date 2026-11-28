import { motion } from 'framer-motion'

export default function MusicPlayer({ isPlaying, onToggle, isHome = false, isFuture = false }) {
  return (
    <motion.button
      type="button"
      className={`music${isHome ? ' music-bookmark' : ''}${isFuture ? ' music-future' : ''}`}
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause musik' : 'Putar musik'}
      aria-pressed={isPlaying}
      animate={isPlaying && !isHome ? { rotate: 360 } : { rotate: 0 }}
      transition={
        isPlaying && !isHome
          ? { repeat: Infinity, duration: 6, ease: 'linear' }
          : {}
      }
    >
      {isPlaying ? 'Ⅱ' : '▶'}
    </motion.button>
  )
}
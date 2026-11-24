import { motion } from 'framer-motion'

export default function MusicPlayer({ isPlaying, onToggle }) {
  return (
    <motion.button
      className="music"
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause musik' : 'Putar musik'}
      animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
      transition={
        isPlaying
          ? { repeat: Infinity, duration: 6, ease: 'linear' }
          : {}
      }
    >
      {isPlaying ? 'Ⅱ' : '▶'}
    </motion.button>
  )
}
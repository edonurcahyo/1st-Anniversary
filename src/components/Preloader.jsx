import { motion } from 'framer-motion'

export default function Preloader() {
  return (
    <motion.div
      className="preloader"
      role="progressbar"
      aria-label="Menyiapkan memori cinta"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="preloader-content">
        {/* Ornate Circular Emblem - Deep Navy & Silver */}
        <motion.div
          className="preloader-crest"
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <motion.div
            className="preloader-ring"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
          />
          <div className="preloader-text-inner">
            <span className="preloader-eyebrow">Our</span>
            <strong className="preloader-script">Story</strong>
            <span className="preloader-date">1st Anniversary</span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="preloader-quote"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
        >
          Membuka lembaran kisah terindah kita...
        </motion.p>

        {/* Elegant Sapphire & White Progress Bar */}
        <div className="preloader-bar-wrap">
          <motion.div
            className="preloader-bar-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.45, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
      </div>
    </motion.div>
  )
}

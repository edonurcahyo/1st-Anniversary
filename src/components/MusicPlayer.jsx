import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
export default function MusicPlayer() {
  const a = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => { a.current?.play().then(() => setOn(true)).catch(() => {}) }, [])
  const toggle = () => { if (on) a.current.pause(); else a.current.play(); setOn(!on) }
  return (
    <>
      <audio ref={a} src="/audio/music.mp3" loop />
      <motion.button className="music" onClick={toggle} aria-label={on ? 'Pause musik' : 'Putar musik'} animate={on ? { rotate: 360 } : { rotate: 0 }} transition={on ? { repeat: Infinity, duration: 6, ease: 'linear' } : {}}>{on ? 'Ⅱ' : '▶'}</motion.button>
    </>
  )
}

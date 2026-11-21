import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { letter } from '../data/letter'
export default function LetterPage({ back }) {
  const [open, setOpen] = useState(false)
  const [n, setN] = useState(0)
  const done = n >= letter.length
  useEffect(() => {
    if (!open || done) return
    const i = setInterval(() => setN((x) => x + 1), 35)
    return () => clearInterval(i)
  }, [open, done])
  return (
    <div className="page">
      {!open ? (
        <motion.button className="envelope" onClick={() => setOpen(true)} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }} whileTap={{ scale: 0.95 }}>
          <i className="flap" /><span className="seal" aria-hidden="true">♡</span><em>Ketuk untuk membuka</em>
        </motion.button>
      ) : (
        <motion.div className="paper letter-paper" initial={{ y: 80, opacity: 0, scale: 0.85, rotateX: 40 }} animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }} transition={{ type: 'spring', damping: 18 }}>
          <p className="letter">{letter.slice(0, n)}{!done && <span className="caret">|</span>}</p>
        </motion.div>
      )}
      <div className="row">
        {open && !done && <button className="ghost" onClick={() => setN(letter.length)}>Tampilkan semua</button>}
        <button onClick={back}>Kembali</button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { reasons } from '../data/reasons'
function Card({ text, n }) {
  const [f, setF] = useState(false)
  return (
    <motion.button className="flip" onClick={() => setF(!f)} initial={{ opacity: 0, y: 40, rotate: n % 2 ? 4 : -4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: n * 0.1, type: 'spring' }} whileHover={{ y: -6 }}>
      <motion.div className="flip-in" animate={{ rotateY: f ? 180 : 0 }} transition={{ duration: 0.6 }}>
        <div className="face front"><span aria-hidden="true">♡</span>Alasan #{n + 1}</div>
        <div className="face back">{text}</div>
      </motion.div>
    </motion.button>
  )
}
export default function ReasonsPage({ back }) {
  return (
    <div className="page wide">
      <h2 className="script hero sm">Alasan aku sayang kamu</h2>
      <p className="muted sm">Ketuk kartunya satu per satu</p>
      <div className="flips">{reasons.map((r, i) => <Card key={i} text={r} n={i} />)}</div>
      <button onClick={back}>Kembali</button>
    </div>
  )
}

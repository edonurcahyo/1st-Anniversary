import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from '../data/config'

function getNextAnniversary() {
  const date = new Date(config.startDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  while (date < today) {
    date.setFullYear(date.getFullYear() + 1)
  }

  return date.toLocaleDateString('id-ID', { dateStyle: 'long' })
}

export default function FuturePage({ back }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="page chapter-content-page future-page">
      <header className="page-heading">
        <p className="eyebrow">Chapter 07 · Untuk Masa Depan</p>
        <h2 className="script hero sm">To The Future</h2>
        <p className="chapter-page-subtitle">Mari melangkah lebih jauh, selamanya.</p>
      </header>

      <section className={`future-capsule${isOpen ? ' is-open' : ''}`}>
        <div className="future-capsule-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <path d="M7 5h18M7 27h18M9 5c0 6 7 6 7 11s-7 5-7 11m14-22c0 6-7 6-7 11s7 5 7 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M12 21h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        <p className="future-capsule-date">Surat untuk dibaca kembali · {getNextAnniversary()}</p>
        <h3>Untuk kita, di masa depan</h3>
        <button
          type="button"
          className="future-open-button"
          aria-expanded={isOpen}
          aria-controls={isOpen ? 'future-letter' : undefined}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? 'Tutup surat' : 'Buka kapsul waktu'}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="future-letter"
              className="future-letter"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22 }}
            >
              <p><strong>Untuk kita yang sedang membaca halaman ini,</strong></p>
              <p>
                Semoga kita terus menemukan hal-hal kecil untuk disyukuri,
                menjaga mimpi yang ingin dicapai bersama, dan tetap memilih satu
                sama lain dalam setiap bab baru kehidupan kita.
              </p>
              <p>
                Ada satu doa yang selalu ingin aku titipkan kepada Allah. Jika
                memang aku adalah pasangan terbaik untuk Alvi, ya Allah, tolong
                jaga hati kami berdua. Lancarkanlah segala urusan kami, mudahkan
                setiap langkah yang sedang dan akan kami lalui.
              </p>
              {/* <p>
                Aku juga berdoa, semoga Alvi bisa menjadi perempuan yang
                menemaniku di setiap langkah kehidupan. Seseorang yang bisa aku
                bahagiakan, aku jaga, aku lindungi, dan aku sayangi sampai akhir
                nanti.
              </p> */}
              <p>
                Jika memang dia adalah takdirku, jangan biarkan kami
                saling kehilangan. Bimbinglah kami agar selalu bisa saling
                memahami, menguatkan, memaafkan, dan memperjuangkan satu sama
                lain. Semoga apa pun yang sedang kami bangun hari ini bisa terus
                tumbuh menjadi sesuatu yang indah di masa depan.
              </p>
              <p>
                Dan jika suatu hari nanti kita membaca kembali halaman ini,
                semoga kita masih bersama, dengan senyum yang sama, cinta yang
                semakin dewasa, serta lebih banyak cerita yang telah kita lalui
                berdua.
              </p>
              <p><strong>Aamiin ya Rabbal 'alamin.</strong></p>
              <p className="future-letter-signoff">
                Dengan harapan dan doa,
                <br />
                <strong>kita yang hari ini.</strong>{' '}
                <span aria-hidden="true">♡</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <p className="chapter-editor-note">
        Simpan halaman ini sebagai pengingat untuk semua cerita yang masih menanti.
      </p>
      <button type="button" className="back-menu-btn" onClick={back}>
        Kembali ke Daftar Isi
      </button>
    </div>
  )
}

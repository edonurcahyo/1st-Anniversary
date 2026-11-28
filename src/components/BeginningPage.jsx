import { motion, useReducedMotion } from 'framer-motion'

const storyData = [
  {
    id: 'pertemuan-pertama',
    title: 'Pertemuan pertama',
    paragraphs: [
      'Hari itu bermula seperti hari-hari biasa. Langit sore menggantung lembut di atas kota, sementara langkah-langkah kecil membawa kami ke tempat yang sama tanpa pernah tahu bahwa sesuatu akan berubah.',
      'Sebuah sapaan sederhana membuka percakapan. Tak ada kata-kata istimewa atau adegan seperti dalam film, hanya senyum yang terasa akrab dan obrolan ringan yang perlahan membuat waktu berjalan lebih cepat.',
      'Ketika akhirnya kami berpisah, ada bagian kecil dari hari itu yang tertinggal. Barangkali sebuah rasa ingin tahu, barangkali juga awal dari cerita yang belum berani kami beri nama.',
    ],
    image: '/images/memories/pic1.jpeg',
  },
  {
    id: 'cerita-yang-berulang',
    title: 'Percakapan yang berlanjut',
    paragraphs: [
      'Hari-hari berikutnya dipenuhi pesan singkat dan cerita sederhana. Kami berbagi hal-hal kecil: lagu yang sedang diputar, makanan yang ingin dicoba, juga keluh kesah yang biasanya hanya disimpan sendiri.',
      'Tanpa disadari, percakapan itu menjadi bagian yang dinanti. Ada kehangatan dalam mengetahui bahwa di penghujung hari, selalu ada seseorang yang bersedia mendengarkan sampai cerita yang paling remeh selesai.',
      'Dari sana, kedekatan tumbuh dengan caranya sendiri. Bukan terburu-buru, melainkan perlahan—seperti halaman-halaman buku yang dibuka satu demi satu.',
    ],
    image: '/images/memories/pic2.jpg',
  },
  {
    id: 'awal-sebuah-kisah',
    title: 'Awal sebuah kisah',
    paragraphs: [
      'Lalu datanglah hari ketika kebersamaan terasa begitu alami. Kami mulai mengumpulkan kenangan: tawa yang tak direncanakan, perjalanan singkat, dan momen tenang saat dunia seolah memberi kami ruang untuk berdua.',
      'Tentu saja, tidak semua halaman selalu mudah dibaca. Namun kami belajar untuk saling memahami, memberi waktu, dan kembali memilih satu sama lain setelah setiap perbedaan.',
      'Kini, saat menengok ke belakang, semuanya terasa seperti prolog yang indah. Sebuah sapaan sederhana telah membawa kami ke sini—dan kisah ini masih terus berjalan, menunggu halaman-halaman berikutnya.',
    ],
    image: '/images/memories/pic3.jpg',
  },
]

export default function BeginningPage({ back }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="page wide chapter-content-page">
      <header className="page-heading">
        <p className="eyebrow">Chapter 01 · Awal Mula</p>
        <h2 className="script hero sm">How It All Began</h2>
        <p className="chapter-page-subtitle">
          Dari sebuah sapaan biasa, menjadi cerita yang luar biasa.
        </p>
      </header>

      <div className="novel-story">
        {storyData.map((story, storyIndex) => (
          <section
            key={story.id}
            className="novel-chapter"
            aria-labelledby={`story-title-${story.id}`}
          >
            <h3 id={`story-title-${story.id}`}>{story.title}</h3>
            {story.image && (
              <figure
                className={`novel-illustration ${storyIndex % 2 === 0 ? 'float-right' : 'float-left'}`}
              >
                <img
                  src={story.image}
                  alt={`Ilustrasi untuk ${story.title}`}
                  loading="lazy"
                />
                <figcaption>{story.title}</figcaption>
              </figure>
            )}
            {story.paragraphs.map((paragraph, paragraphIndex) => (
              <motion.p
                key={`${story.id}-${paragraphIndex}`}
                className="novel-text"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.45,
                  delay: paragraphIndex * 0.06,
                  ease: 'easeOut',
                }}
              >
                {paragraphIndex === 0 ? (
                  <>
                    <span className="drop-cap">{paragraph[0]}</span>
                    {paragraph.slice(1)}
                  </>
                ) : (
                  paragraph
                )}
              </motion.p>
            ))}
          </section>
        ))}
      </div>

      <button type="button" className="back-menu-btn" onClick={back}>
        Kembali ke Daftar Isi
      </button>
    </div>
  )
}

import { motion, useReducedMotion } from 'framer-motion'

const storyData = [
  {
    id: 'getir-tujuh-tahun',
    title: 'Bab 1: Getir yang Tertinggal Tujuh Tahun',
    paragraphs: [
      'Senin, 8 Desember 2025. Langit pagi itu masih gelap, tapi aku sudah sibuk bergulat dengan ponselku. Jam di layar baru menunjukkan pukul 04.09. Mataku perih karena begadang, tapi jantungku justru berdebar kencang.',
      'Beberapa jam sebelumnya, aku dan Alvi—sahabat lamaku sejak SMP—baru saja selesai membahas drakor yang sama-sama kami tonton. Alvi mengaku stuck di episode 11 karena ketiduran. Percakapan ringan itu sebenarnya biasa saja, sampai tiba-tiba obrolan kami berbelok ke arah yang tak terduga.',
      '“Apa jangan-jangan kita...” tulis Alvi di chat.',
      'Kalimat yang belum selesai itu langsung membuat jantungku seolah berhenti berdetak. Apa maksudnya? Apakah dia tahu? batinku panik. Aku mengetik balasan, mencoba mencari kejelasan, tapi juga takut jika dugaanku salah. Namun, jawaban Alvi justru membuat duniaku berputar.',
      '“kaloo aku sii yess, tapi gatauu kaloo kamuu doo?”',
      'Aku mematung. Aku menatap layar ponselku lama sekali. Tujuh tahun. Tujuh tahun aku menyimpan rasa itu dalam-dalam, dari bangku kelas 9 SMP hingga kini duduk di semester akhir. Aku selalu berpikir bahwa perasaanku bertepuk sebelah tangan. Aku takut merusak pertemanan kami jika jujur. Aku takut kehilangan Alvi.',
      '“Edo, kamu kenapa? Dari tadi liatin HP terus,” tegur salah satu teman sekelasku, membuyarkan lamunanku.',
      'Aku menggeleng cepat. “Nggak, nggak apa-apa. Cuma ada tugas.”',
      'Tentu saja itu bohong. Di dalam kepalaku, ribuan skenario berputar. Haruskah aku bilang sekarang? Tapi aku harus masuk kelas. Kalau aku bilang sekarang, aku nggak bisa fokus. Kalau kutunda, dia bakal mikir yang aneh-aneh.',
      'Akhirnya, dengan jari yang sedikit gemetar, aku mengetik, “iyaa. maaf alvi ga ngasih kalimat yang propper. aku salting bangett.”',
      'Alvi membalas dengan tawa kecil di chat. “Ehhh lucuuu bangettt. iyaaa gapapaa amann kokk. Samaa aku jugaa saltingg makanya ga baless chatmuu duluu.”',
      'Aku menahan senyum. Pipiku terasa panas. Aku menoleh ke luar jendela, menatap pepohonan di kampus yang bergoyang pelan tertiup angin pagi. Ternyata bukan cuma aku, pikirku. Selama ini, dia juga menunggu.',
    ],
    image: '/images/memories/pic1.jpeg',
  },
  {
    id: 'surat-panjang',
    title: 'Bab 2: Surat Panjang di Sela-Sela Kelas',
    paragraphs: [
      'Kuliah pagi itu benar-benar menjadi siksaan batin bagiku. Aku datang terlambat. Begitu masuk kelas, dosen sudah berdiri di depan. Dengan langkah setengah berlari, aku menuju bangku paling depan yang masih kosong karena seluruh bangku belakang sudah terisi.',
      'Sial. Aku benar-benar tersisih di bangku depan. Dosen sedang menjelaskan sesuatu, tapi telingaku seperti tersumbat. Mataku terus melirik ponsel di atas meja, sambil berusaha menjaga ekspresi agar tetap datar di depan dosen.',
      'Di sela-sela jam kosong, aku menyelinap ke sudut perpustakaan kampus. Aku membutuhkan tempat yang tenang. Aku ingin mengungkapkan semuanya dengan benar—bukan sekadar “iya” atau “sama”. Aku ingin Alvi tahu betapa lama aku menahan ini.',
      'Aku mulai mengetik. Kalimat demi kalimat mengalir deras, seperti bendungan yang akhirnya jebol.',
      '“halo Alvii, maaf ya baru sekarang aku menyampaikan ini. sebenarnya aku sudah punya perasaan suka ke kamu sejak kelas 9 SMP duluu, tapi waktu itu aku ga berani ngungkapin nyaa. selain karena mau lulus, aku juga pikir hanya aku yang punya perasaan ini...”',
      'Aku berhenti mengetik dan menghela napas panjang. Aku ingat betul bagaimana dulu aku sering diam-diam memperhatikan Alvi di kelas, tapi selalu menahan diri karena takut diledekin teman-teman. Apalagi dulu, aku sempat dijodoh-jodohkan dengan teman sekelasku, Ayunur. Aku tidak pernah suka. Hatiku sudah milik Alvi sejak lama.',
      '“tahun demi tahun berlalu, tapi perasaan itu masih ada. sampai sekarang, di tahun 2025, aku masih memiliki perasaan itu. jujur aku sering bingung sendiri, bagaimana mungkin aku masih menyukai seseorang yang sudah lama sekali tidak aku temui? aku orangnya gampang overthinking, takut kalau aku chat kamu malah mengganggu atau kamu lagi sibuk...”',
      'Aku tersenyum getir. Aku memang selalu jadi orang yang terlalu banyak berpikir. Bahkan saat ingin menyapa, aku harus berpikir seribu kali agar tidak terlihat aneh di mata Alvi.',
      'Aku melanjutkan tulisanku. Kuceritakan momen Jumat, 5 Desember 2025, saat akhirnya aku sadar bahwa perasaan itu ternyata berbalas. Kutulis juga bahwa hari ini, Senin, 8 Desember, aku memberanikan diri untuk jujur pada diriku sendiri.',
      '“Alvii, dengan segala pertimbangan best case maupun worst case, aku ingin mengungkapkan perasaanku padamu. Alvii maukah kamu menerima perasaanku ini??”',
      'Aku menekan tombol send. Ponsel kututup, lalu dahiku kutempelkan ke meja perpustakaan. Jantungku berdebar sangat kencang, sampai aku bisa merasakan denyutnya di telinga.',
      '“aduh malah jadi cerita panjang, maaf ya kalau bertele tele,” tambahku cepat, takut Alvi merasa terbebani.',
      'Hanya butuh beberapa menit sampai balasan itu datang. Namun, ketika membaca pesan Alvi, mataku langsung memanas.',
      '“Edooo. jujurrr yaaa aku jugaa mau bilang ke kamuuu. sebenernya aku juga suka sama kamu dari SMP dan sampe sekarang jugaaa. dulu tak kira waktu kita lulus pun aku bisa lupain kamuuuu ternyata ga segampang ituuuu...”',
      'Aku refleks menutup mulut dengan tangan. Aku menatap layar ponsel, membaca ulang kalimat itu, memastikan bahwa diriku tidak sedang bermimpi. Alvi juga menyukaiku. Alvi juga tidak bisa melupakanku.',
    ],
    image: '/images/memories/pic2.jpg',
  },
  {
    id: 'sejuta-rasa',
    title: 'Bab 3: Sejuta Rasa di Ruang Kelas',
    paragraphs: [
      'Kelas siang itu terasa berbeda. Aku masih duduk di barisan depan, mencoba tetap fokus pada materi yang diajarkan. Tapi ponselku tak henti-hentinya bergetar. Alvi terus mengirim pesan, dan aku membalas cepat sambil menutupi layar dengan tangan agar tidak terlihat dosen.',
      '“Iyaa dooo mauuu. jujur udh lamaa aku nunggu kamu ngungkapin ke akuu,” tulis Alvi.',
      'Aku tersenyum lebar. Aku menunduk, menyembunyikan wajah di balik buku catatan agar tidak ada yang melihatku sedang menahan tawa bahagia.',
      '“Jadi nangiss akuu ihhh,” lanjut Alvi.',
      'Dadaku terasa sesak. Aku ingin sekali bisa memeluk Alvi saat ini juga. Aku ingin bilang bahwa semuanya akan baik-baik saja.',
      '“jujur aja aku daridulu takut kalau ngungkapin, takut nanti ditolak,” balasku.',
      'Alvi menanggapinya dengan lembut. “Iyaaa gapapaa, aku tau kokk. Pastii km nunggu lama takut klo misal aku nolak malah kita yg asing kannn.”',
      'Aku menoleh ke luar jendela. Kelas masih berjalan, tapi pikiranku sudah melayang jauh. Alvi benar. Rasa takut itu yang membuatku diam selama bertahun-tahun. Aku takut jika mengungkapkan perasaanku, Alvi akan menjauh dan kami tidak akan pernah bisa berbincang seperti ini lagi.',
      'Namun, sekarang semuanya sudah jelas. Tidak ada lagi rasa takut. Tidak ada lagi keraguan.',
      '“Sayanggg?” tiba-tiba Alvi mengirim pesan.',
      'Aku tersentak. Aku membaca kata itu berulang kali. Sayang. Panggilan yang sederhana, tapi membuat pipiku langsung memerah. Dengan gugup, aku mengetik, “Ehhhh to much ga yaa? Takut kamu ilfeel.”',
      'Alvi cepat membalas. “Lohhh kenapaa.”',
      '“Ya kali aja kamu ngerasa aneh dipanggil kayak gitu,” gumamku lirih, meskipun aku tahu Alvi tidak bisa mendengarnya.',
      'Rasa cemasanku sirna ketika Alvi mengirim pesan panjang: “bebass alviii, tenang aja aku ga bakal ilfeel. gapapaaa alvii bebas apapun yang kamu mauu.”',
      'Aku tersenyum malu. Lalu kuketik satu kata yang akan mengubah segalanya: “sayangg.”',
    ],
    image: '/images/memories/pic3.jpg',
  },
  {
    id: 'awal-selamanya',
    title: 'Bab 4: Awal dari Selamanya',
    paragraphs: [
      'Kelas selesai sekitar pukul dua siang. Aku bergegas pulang, tapi langkahku terasa ringan. Sepanjang perjalanan, aku dan Alvi terus bertukar pesan.',
      '“jaga kesehatan ya sayangg,” tulisku.',
      '“Iyaa jangan sampee telatt yaaa makannyaa,” balas Alvi.',
      'Sesampainya di rumah, aku langsung merebahkan diri di atas kasur. Aku memandangi langit-langit kamar, masih tidak percaya dengan apa yang terjadi hari ini.',
      '“kamu takutt akuu jauhhh kahh?? Tenang ajaa aku disiniii,” tulis Alvi beberapa saat kemudian.',
      'Aku menghela napas. Dulu memang aku takut. Takut kalau rasa ini akan membuat kami menjauh. Tapi sekarang, aku sadar bahwa ketakutanku itu hanyalah ilusi.',
      '“iyaaa aku takutt bangett,” balasku jujur.',
      '“Tenang ajaa aku tetepp disinii kokk nunggu kamuu.”',
      'Mataku memanas lagi. Aku menutupi wajah dengan lengan. Bagaimana mungkin ada orang yang begitu sabar menunggu selama ini? batinku.',
      'Sore itu, obrolan kami mengalir begitu saja. Mulai dari rencana bermain Roblox bersama, sampai ke teman lama kami, Ramadhan, yang ternyata sudah tahu tentang perasaan kami berdua sejak lama.',
      '“Ramadhan pasti ga pernah bisa ikut nongkrong kalau diajak bareng apip,” tulisku, membuat Alvi tertawa di seberang sana.',
      '“Liatenn taa yanggg,” balas Alvi.',
      'Aku tersenyum kecil. Aku mengingat masa-masa SMA, saat aku dan Alvi masih sering bermain bersama teman-teman. Saat itu, aku benar-benar tidak menyangka bahwa Ramadhan, teman sekelasku, diam-diam menyimpan rahasia tentang perasaan Alvi yang sebenarnya.',
      '“iyaa, ga bakal tau aku kalau selama ini kita punya perasaan yang samaa,” tulisku.',
      'Alvi membalas dengan emoji tertawa. “Iyaa kannnn. gapapaa sayangg yg penting kita udah sama sama tauu klo cintanya ga bertepuk sebelah tangannn.”',
      'Aku tersenyum menatap layar ponsel, membaca semua pesan yang masuk. Rasanya seperti sedang berada di dalam cerita novel yang kutulis sendiri—sebuah cerita yang dimulai dengan keraguan, tapi diakhiri dengan kepastian.',
      '“Mungkin inii yang dinamakan kisah kita yg belum selesai?? Makanya sampe awet sampe 7 taunn,” tulis Alvi.',
      'Dengan hati ringan, aku membalas, “iyaa kayaknyaa. pasti jadi banyak yang berinisiatif buat confess langsung, karena mungkin orang yang disukai ternyata suka jugaa.”',
      'Malam itu, sebelum memejamkan mata, aku melihat ponsel sekali lagi. Kubaca chat terakhir dari Alvi.',
      '“Iyaa aamiin, klo jodoh ga bakal kemana kok sayangg.”',
      'Aku tersenyum. Ponsel kuletakkan di meja samping kasur, lalu kututup mata.',
      'Hari ini, 8 Desember 2025, adalah hari ketika cerita kami yang sebenarnya dimulai. Tujuh tahun adalah waktu yang sangat lama, tapi pada akhirnya, semuanya terbayar lunas.',
      'Dan untuk pertama kalinya setelah sekian lama, aku tidur dengan senyuman yang tak pernah hilang dari wajahku.',
    ],
    image: '/images/memories/pic4.jpg',
  },
]

export default function BeginningPage({ back }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="page wide chapter-content-page">
      <header className="page-heading">
        <p className="eyebrow">Kisah Edo &amp; Alvi · 8 Desember 2025</p>
        <h2 className="script hero sm">Tujuh Tahun Menunggu</h2>
        <p className="chapter-page-subtitle">
          Hari ketika rasa yang lama dipendam akhirnya menemukan jawabannya.
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

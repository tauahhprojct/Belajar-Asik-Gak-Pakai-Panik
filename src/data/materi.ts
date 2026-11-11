export interface MateriItem {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  iconName: string;
  badge: string;
  estimatedMinutes: number;
  summary: string;
  explanation: {
    heading: string;
    paragraphs: string[];
    keyPoints?: { title: string; desc: string }[];
  };
  dailyExample: {
    situation: string;
    analysis: string;
  };
  benefits: string[];
  practicalTips: {
    tip: string;
    explanation: string;
  }[];
  quote: string;
}

export const MATERI_DATA: MateriItem[] = [
  {
    id: 1,
    slug: 'membangun-kebiasaan-belajar',
    title: 'Membangun Kebiasaan Belajar',
    tagline: 'Belajar bukan tentang duduk paling lama, tetapi menggunakan waktu dengan baik.',
    iconName: 'Brain',
    badge: 'Pondasi Belajar',
    estimatedMinutes: 5,
    summary: 'Kenali arti kebiasaan belajar dan manfaatnya untuk kesiapan, pemahaman, kemandirian, serta perkembangan diri.',
    explanation: {
      heading: 'Apa Itu Kebiasaan Belajar?',
      paragraphs: [
        'Pernah merasa baru semangat belajar ketika besok ada ulangan? Atau sudah membuka buku, tetapi malah sibuk bermain HP? Kamu bukan satu-satunya yang pernah mengalaminya.',
        'Kebiasaan belajar adalah perilaku atau kegiatan yang dilakukan berulang ketika mempelajari sesuatu. Kebiasaan ini mencakup waktu belajar, kedisiplinan, konsentrasi, cara memahami materi, dan tanggung jawab menyelesaikan tugas.',
        'Kebiasaan belajar tidak harus sempurna sejak awal. Kamu bisa membangunnya sedikit demi sedikit melalui tindakan sederhana yang dilakukan secara konsisten.'
      ],
      keyPoints: [
        { title: 'Lebih Siap', desc: 'Kebiasaan belajar yang baik membantu kamu lebih siap menghadapi ulangan dan ujian.' },
        { title: 'Lebih Mandiri', desc: 'Belajar teratur membantu kamu memahami materi dan bertanggung jawab menyelesaikan tugas.' },
        { title: 'Lebih Seimbang', desc: 'Rutinitas yang baik membantu mengatur waktu belajar sekaligus waktu istirahat.' }
      ]
    },
    dailyExample: {
      situation: 'Kamu ingin lebih siap saat ulangan, tetapi biasanya baru membuka buku ketika ujian sudah dekat.',
      analysis: 'Mulailah dengan waktu singkat untuk mengulang materi setelah pulang sekolah. Tindakan kecil yang dilakukan rutin membantu belajar menjadi kebiasaan.'
    },
    benefits: [
      'Lebih siap menghadapi ulangan dan ujian.',
      'Tidak mudah panik ketika mendapatkan tugas.',
      'Memahami materi pelajaran dengan lebih baik.',
      'Memiliki waktu istirahat yang lebih teratur.',
      'Menjadi lebih mandiri dan bertanggung jawab serta mengembangkan potensi diri.'
    ],
    practicalTips: [
      { tip: 'Mulai dari tindakan sederhana', explanation: 'Pilih satu kebiasaan kecil yang sanggup kamu lakukan, lalu jalankan secara konsisten.' },
      { tip: 'Jangan menunggu sempurna', explanation: 'Kebiasaan belajar dibangun sedikit demi sedikit. Perbaiki langkahmu seiring waktu.' }
    ],
    quote: 'Belajar bukan tentang siapa yang paling lama duduk di depan buku, tetapi bagaimana kamu menggunakan waktu belajar dengan baik.'
  },
  {
    id: 2,
    slug: 'belajar-tidak-hanya-saat-ulangan',
    title: 'Belajar Tidak Hanya Saat Ulangan',
    tagline: 'Pelajari materi sedikit demi sedikit, bukan sekaligus ketika ujian sudah dekat.',
    iconName: 'CalendarCheck',
    badge: 'Belajar Rutin',
    estimatedMinutes: 4,
    summary: 'Mengandalkan belajar menjelang ulangan membuat banyak materi harus dipahami dalam waktu singkat.',
    explanation: {
      heading: 'Ubah Kebiasaan Belajar Menjelang Ulangan',
      paragraphs: [
        'Belajar sampai larut malam karena besok ada ulangan membuat kamu harus memahami banyak materi dalam waktu singkat.',
        'Luangkan waktu untuk belajar setiap hari dan ulangi materi setelah pulang sekolah. Jangan menunggu guru mengumumkan ulangan; pelajari materi sedikit demi sedikit.',
        'Cobalah belajar 20–30 menit untuk satu sesi, kemudian beristirahat sesuai kebutuhanmu.'
      ],
      keyPoints: [
        { title: 'Belajar Setiap Hari', desc: 'Ulangi materi secara rutin meskipun tidak ada ulangan.' },
        { title: 'Mulai dari Durasi Singkat', desc: 'Satu sesi 20–30 menit dapat menjadi awal yang realistis.' },
        { title: 'Hindari Belajar Mendadak', desc: 'Jangan menumpuk semua materi hingga malam sebelum ujian.' }
      ]
    },
    dailyExample: {
      situation: 'Sepulang sekolah, kamu mengulang satu materi selama 20 menit walaupun belum ada jadwal ulangan.',
      analysis: 'Kamu tidak perlu memahami semua materi sekaligus. Mengulang sedikit demi sedikit membuat persiapan lebih teratur.'
    },
    benefits: [
      'Lebih siap menghadapi ulangan.',
      'Tidak harus memahami banyak materi dalam waktu singkat.',
      'Mengurangi kepanikan saat jadwal ujian tiba.'
    ],
    practicalTips: [
      { tip: 'Ulangi materi sepulang sekolah', explanation: 'Luangkan waktu singkat untuk melihat kembali pelajaran yang baru diterima.' },
      { tip: 'Buat target per sesi', explanation: 'Pilih satu materi atau satu bagian kecil untuk dipelajari dalam satu sesi.' }
    ],
    quote: 'Konsisten selama 20 menit setiap hari lebih baik daripada membuat jadwal tiga jam tetapi tidak pernah dilakukan.'
  },
  {
    id: 3,
    slug: 'mengatur-waktu-belajar',
    title: 'Mengatur Waktu Belajar',
    tagline: 'Buat jadwal sederhana yang realistis dan sesuai dengan aktivitasmu.',
    iconName: 'Clock',
    badge: 'Atur Waktu',
    estimatedMinutes: 4,
    summary: 'Jadwal dan target harian yang sederhana membantu membentuk rutinitas belajar.',
    explanation: {
      heading: 'Temukan Waktu Belajar yang Sesuai',
      paragraphs: [
        'Belajar hari ini, berhenti besok, lalu baru membuka buku lagi minggu depan membuat rutinitas sulit terbentuk.',
        'Tentukan waktu belajar yang sesuai dengan aktivitasmu. Buat jadwal sederhana, tentukan target harian, dan mulai dari durasi yang sanggup kamu jalankan.',
        'Setiap orang memiliki kondisi dan waktu belajar yang berbeda. Kenali kapan kamu paling mudah berkonsentrasi—pagi, sore, atau malam—dan hindari memaksakan diri ketika sudah sangat mengantuk.'
      ],
      keyPoints: [
        { title: 'Jadwal Sederhana', desc: 'Tentukan waktu belajar yang tidak berbenturan dengan aktivitas penting.' },
        { title: 'Target Harian', desc: 'Buat target yang bisa dilakukan dan mulai dari durasi yang sanggup dijalankan.' },
        { title: 'Kenali Kondisi Diri', desc: 'Pilih waktu saat kamu lebih mudah berkonsentrasi dan cukup beristirahat.' }
      ]
    },
    dailyExample: {
      situation: 'Kamu memilih waktu sore yang tidak berbenturan dengan kegiatan lain dan menjadwalkan belajar selama 20 menit.',
      analysis: 'Jadwal tersebut disesuaikan dengan kondisi dan aktivitasmu, sehingga lebih mungkin dilakukan secara konsisten.'
    },
    benefits: [
      'Rutinitas belajar lebih mudah dibentuk.',
      'Target harian menjadi lebih jelas.',
      'Waktu belajar tidak mengganggu waktu istirahat.'
    ],
    practicalTips: [
      { tip: 'Buat jadwal sederhana', explanation: 'Tuliskan waktu dan target belajar harian yang realistis.' },
      { tip: 'Kenali waktu fokusmu', explanation: 'Pilih pagi, sore, atau malam sesuai kondisi dan aktivitasmu.' },
      { tip: 'Jangan memaksakan diri saat mengantuk', explanation: 'Pastikan tubuh cukup beristirahat dan pilih waktu belajar yang sesuai.' }
    ],
    quote: 'Temukan waktu belajar yang paling sesuai dengan kondisimu.'
  },
  {
    id: 4,
    slug: 'meningkatkan-konsentrasi',
    title: 'Meningkatkan Konsentrasi',
    tagline: 'Kurangi gangguan agar waktu belajar digunakan untuk belajar.',
    iconName: 'Target',
    badge: 'Fokus Belajar',
    estimatedMinutes: 4,
    summary: 'Gangguan dari ponsel dan lingkungan dapat membuat waktu belajar habis untuk hal lain.',
    explanation: {
      heading: 'Fokus pada Satu Tugas',
      paragraphs: [
        'Baru lima menit membaca, lalu membuka TikTok, Instagram, atau WhatsApp? Akhirnya, waktu belajar habis untuk hal lain.',
        'Jauhkan HP dari meja belajar, matikan notifikasi yang tidak penting, fokus pada satu tugas terlebih dahulu, dan pilih tempat yang nyaman.',
        'Gunakan jeda istirahat secara teratur. Kamu bisa mencoba teknik fokus 25 menit dan istirahat 5 menit, lalu menyesuaikan durasinya dengan kemampuan konsentrasimu.'
      ],
      keyPoints: [
        { title: 'Jauhkan HP', desc: 'Letakkan ponsel jauh dari meja dan matikan notifikasi yang tidak penting.' },
        { title: 'Satu Tugas Dahulu', desc: 'Fokus menyelesaikan satu tugas sebelum berpindah ke tugas lain.' },
        { title: 'Atur Jeda', desc: 'Coba fokus 25 menit dan istirahat 5 menit sesuai kemampuanmu.' }
      ]
    },
    dailyExample: {
      situation: 'Saat belajar, kamu meletakkan HP jauh dari meja dan mematikan notifikasi yang tidak penting.',
      analysis: 'Dengan mengurangi gangguan, kamu dapat menggunakan sesi belajar untuk menyelesaikan tugas yang sedang dikerjakan.'
    },
    benefits: [
      'Waktu belajar digunakan dengan lebih baik.',
      'Kamu dapat menyelesaikan tugas satu per satu.',
      'Lingkungan belajar terasa lebih nyaman.'
    ],
    practicalTips: [
      { tip: 'Pilih tempat belajar yang nyaman', explanation: 'Cari tempat yang mendukung konsentrasi dan minim gangguan.' },
      { tip: 'Jauhkan ponsel dari meja', explanation: 'Matikan notifikasi yang tidak penting selama belajar.' },
      { tip: 'Gunakan waktu istirahat', explanation: 'Cobalah sesi fokus 25 menit dan istirahat 5 menit, lalu sesuaikan dengan kebutuhanmu.' }
    ],
    quote: 'Fokus pada satu tugas terlebih dahulu.'
  },
  {
    id: 5,
    slug: 'mengingat-pelajaran',
    title: 'Mengingat Pelajaran',
    tagline: 'Latih diri untuk mengingat dan menjelaskan materi, bukan hanya membacanya.',
    iconName: 'Lightbulb',
    badge: 'Strategi Belajar',
    estimatedMinutes: 4,
    summary: 'Rangkuman, pertanyaan, penjelasan dengan kata-kata sendiri, dan active recall membantu kamu berlatih memahami materi.',
    explanation: {
      heading: 'Coba Active Recall',
      paragraphs: [
        'Sudah membaca materi berkali-kali, tetapi ketika ditanya guru justru lupa? Bisa jadi kamu hanya membaca tanpa mencoba mengingat kembali informasi tersebut.',
        'Buat rangkuman dengan bahasamu sendiri, coba jelaskan materi tanpa melihat buku, dan buat pertanyaan dari materi yang dipelajari.',
        'Ulangi materi pada hari berikutnya atau gunakan kartu belajar (flashcard). Active recall berarti melatih diri mengingat materi tanpa terus-menerus melihat catatan.'
      ],
      keyPoints: [
        { title: 'Rangkuman Sendiri', desc: 'Tuliskan inti materi menggunakan bahasamu sendiri.' },
        { title: 'Ingat Tanpa Catatan', desc: 'Coba menjelaskan kembali materi tanpa melihat buku.' },
        { title: 'Ulangi dan Berlatih', desc: 'Buat pertanyaan, ulangi materi, atau gunakan flashcard.' }
      ]
    },
    dailyExample: {
      situation: 'Setelah membaca satu bagian materi, kamu menutup buku lalu mencoba menjelaskan kembali isinya.',
      analysis: 'Cara ini melatihmu mengingat materi tanpa terus-menerus melihat catatan dan membantu mengetahui bagian yang perlu dipelajari lagi.'
    },
    benefits: [
      'Kamu dapat mengetahui bagian materi yang sudah dipahami.',
      'Belajar menjadi lebih aktif daripada hanya membaca ulang.',
      'Materi dapat diulang dengan beberapa cara sederhana.'
    ],
    practicalTips: [
      { tip: 'Buat rangkuman sendiri', explanation: 'Catat poin penting menggunakan bahasamu sendiri.' },
      { tip: 'Jelaskan tanpa melihat buku', explanation: 'Tutup catatan dan coba ceritakan kembali materi yang baru dipelajari.' },
      { tip: 'Gunakan flashcard', explanation: 'Buat kartu belajar untuk membantu mengulang pertanyaan dan jawaban.' }
    ],
    quote: 'Coba mengingat kembali materi tanpa terus-menerus melihat catatan.'
  },
  {
    id: 6,
    slug: 'mulai-belajar-dan-atasi-menunda',
    title: 'Mulai Belajar dan Atasi Menunda',
    tagline: 'Pecah tugas besar menjadi langkah kecil yang mudah dimulai.',
    iconName: 'Flame',
    badge: 'Mulai Bertindak',
    estimatedMinutes: 4,
    summary: 'Kesulitan memulai bisa diatasi dengan tugas yang mudah, target sederhana, dan aturan lima menit.',
    explanation: {
      heading: 'Mulai dari Langkah Kecil',
      paragraphs: [
        'Kadang bukan karena tidak bisa belajar, tetapi karena terasa sulit untuk memulai. Pikiran “nanti saja, masih ada waktu” dapat membuat tugas terus tertunda.',
        'Mulai dari tugas yang paling mudah, pecah tugas besar menjadi bagian kecil, dan gunakan target sederhana. Setelah menyelesaikan tugas, berikan apresiasi kepada diri sendiri.',
        'Cobalah aturan lima menit: katakan kepada dirimu, “Aku coba belajar lima menit saja dulu.”'
      ],
      keyPoints: [
        { title: 'Tugas Paling Mudah', desc: 'Pilih satu bagian ringan untuk menjadi langkah awal.' },
        { title: 'Pecah Tugas', desc: 'Ubah tugas besar menjadi beberapa bagian kecil.' },
        { title: 'Aturan Lima Menit', desc: 'Mulai belajar selama lima menit untuk melewati kesulitan memulai.' }
      ]
    },
    dailyExample: {
      situation: 'Kamu menunda tugas yang terasa besar, lalu membaginya menjadi beberapa bagian dan mulai dari bagian paling mudah.',
      analysis: 'Target kecil membuat langkah awal lebih jelas. Setelah mulai, kamu dapat melanjutkan bagian berikutnya secara bertahap.'
    },
    benefits: [
      'Tugas terasa lebih mudah untuk dimulai.',
      'Target belajar menjadi lebih sederhana dan jelas.',
      'Kamu memiliki kesempatan untuk menghargai usaha sendiri.'
    ],
    practicalTips: [
      { tip: 'Pecah tugas besar', explanation: 'Susun tugas menjadi bagian kecil yang dapat dikerjakan satu per satu.' },
      { tip: 'Coba aturan lima menit', explanation: 'Mulai belajar lima menit dahulu, lalu tentukan langkah selanjutnya.' },
      { tip: 'Kurangi kebiasaan mengatakan “nanti”', explanation: 'Pilih satu tindakan kecil yang dapat kamu lakukan sekarang.' }
    ],
    quote: 'Perubahan kebiasaan dapat dimulai dari tindakan kecil.'
  },
  {
    id: 7,
    slug: 'menyiapkan-kondisi-belajar',
    title: 'Menyiapkan Kondisi Belajar',
    tagline: 'Pilih tempat yang mendukung fokus dan atur waktu agar tubuh cukup beristirahat.',
    iconName: 'ShieldCheck',
    badge: 'Kondisi Belajar',
    estimatedMinutes: 4,
    summary: 'Tempat yang tenang, pencahayaan cukup, jeda saat lelah, dan waktu tidur yang terjaga mendukung kegiatan belajar.',
    explanation: {
      heading: 'Belajar dengan Kondisi yang Mendukung',
      paragraphs: [
        'Belajar sambil mengantuk atau berada di tempat ramai dapat membuatmu sulit fokus.',
        'Pilih tempat belajar yang lebih tenang, pastikan pencahayaan cukup, dan beristirahat ketika mulai merasa lelah. Atur waktu belajar agar tidak mengganggu waktu tidur.',
        'Komunikasikan kebutuhan waktu belajar kepada keluarga. Jika rasa kantuk berlebihan terus terjadi meskipun kamu sudah cukup beristirahat, pertimbangkan untuk berkonsultasi dengan orang dewasa tepercaya atau tenaga kesehatan.'
      ],
      keyPoints: [
        { title: 'Tempat yang Tenang', desc: 'Pilih lingkungan yang membantu kamu berkonsentrasi.' },
        { title: 'Istirahat yang Cukup', desc: 'Berhenti sejenak ketika lelah dan jangan mengorbankan waktu tidur.' },
        { title: 'Minta Dukungan', desc: 'Komunikasikan kebutuhan belajarmu kepada keluarga atau orang dewasa tepercaya.' }
      ]
    },
    dailyExample: {
      situation: 'Kamu merasa sulit fokus karena tempat belajar ramai dan waktu belajarmu terlalu dekat dengan waktu tidur.',
      analysis: 'Pilih tempat yang lebih tenang, atur ulang waktu belajar, dan komunikasikan kebutuhanmu kepada keluarga.'
    },
    benefits: [
      'Kegiatan belajar didukung lingkungan yang lebih nyaman.',
      'Waktu belajar tidak mengganggu waktu tidur.',
      'Kamu mengetahui kapan perlu beristirahat atau meminta bantuan.'
    ],
    practicalTips: [
      { tip: 'Pilih tempat yang lebih tenang', explanation: 'Siapkan tempat dengan pencahayaan yang cukup.' },
      { tip: 'Istirahat ketika lelah', explanation: 'Atur waktu belajar supaya tidak mengganggu waktu tidur.' },
      { tip: 'Komunikasikan kebutuhanmu', explanation: 'Bicarakan waktu dan kondisi belajar yang kamu perlukan kepada keluarga.' }
    ],
    quote: 'Pastikan tubuh dalam kondisi cukup istirahat.'
  },
  {
    id: 8,
    slug: 'belajar-mandiri-dan-evaluasi',
    title: 'Belajar Mandiri dan Evaluasi Diri',
    tagline: 'Kerjakan dengan kemampuan sendiri, gunakan strategi belajar, lalu evaluasi perkembanganmu.',
    iconName: 'ShieldCheck',
    badge: 'Mandiri & Berkembang',
    estimatedMinutes: 5,
    summary: 'Tugas yang dikerjakan sendiri memberi kesempatan untuk memahami materi dan memperbaiki kesalahan.',
    explanation: {
      heading: 'Belajar dengan Cara yang Tepat',
      paragraphs: [
        'Menyalin pekerjaan teman mungkin membuat tugas cepat selesai, tetapi kamu kehilangan kesempatan untuk memahami materi.',
        'Kerjakan tugas dengan kemampuan sendiri. Bertanyalah kepada guru ketika belum memahami materi, diskusikan soal bersama teman, dan gunakan buku serta sumber belajar sebagai referensi.',
        'Untuk meningkatkan kebiasaan belajar, buat target kecil, atur jadwal yang realistis, cari tempat yang nyaman, gunakan strategi seperti rangkuman, peta konsep, latihan soal, dan active recall, lalu evaluasi perkembanganmu.'
      ],
      keyPoints: [
        { title: 'Kerjakan Sendiri', desc: 'Gunakan kemampuanmu dan sumber belajar sebagai referensi, bukan menyalin pekerjaan teman.' },
        { title: 'Minta Bantuan', desc: 'Bertanya kepada guru dan berdiskusi dengan teman dapat membantu memahami materi.' },
        { title: 'Lima Langkah Upgrade', desc: 'Buat target kecil, atur jadwal, siapkan tempat, gunakan strategi, dan evaluasi perkembangan.' }
      ]
    },
    dailyExample: {
      situation: 'Kamu belum memahami soal, lalu mencoba mengerjakannya sendiri, mencari referensi, dan bertanya kepada guru.',
      analysis: 'Mencoba sendiri dan mengevaluasi kesalahan memberi kesempatan untuk memahami materi, bukan sekadar menyelesaikan tugas.'
    },
    benefits: [
      'Memahami materi melalui usaha sendiri.',
      'Mengetahui hal yang masih perlu dipelajari.',
      'Kebiasaan belajar dapat diperbaiki secara bertahap.'
    ],
    practicalTips: [
      { tip: 'Gunakan strategi belajar', explanation: 'Coba rangkuman, peta konsep, latihan soal, atau active recall.' },
      { tip: 'Bertanya ketika belum paham', explanation: 'Minta penjelasan kepada guru dan diskusikan soal bersama teman.' },
      { tip: 'Evaluasi perkembangan', explanation: 'Perhatikan perubahan kebiasaanmu dan perbaiki hal yang masih sulit.' }
    ],
    quote: 'Lebih baik salah saat mencoba sendiri daripada selalu benar karena menyalin jawaban orang lain.'
  }
];

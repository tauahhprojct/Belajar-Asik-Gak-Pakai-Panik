export interface QuestionItem {
  id: number;
  question: string;
  context?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export const QUIZ_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    question: 'Kapan waktu yang paling tepat untuk membangun kebiasaan belajar?',
    context: 'Topik: Kebiasaan Belajar',
    options: [
      { key: 'A', text: 'Hanya ketika ada ulangan' },
      { key: 'B', text: 'Setiap hari secara teratur sesuai kondisi diri' },
      { key: 'C', text: 'Ketika guru memberikan tugas' },
      { key: 'D', text: 'Saat menjelang ujian akhir' }
    ],
    correctAnswer: 'B',
    explanation: 'Kebiasaan belajar dapat dibangun dengan tindakan sederhana yang dilakukan secara konsisten. Belajarlah secara teratur sesuai kondisi dan aktivitasmu.'
  },
  {
    id: 2,
    question: 'Apa yang sebaiknya dilakukan ketika sulit berkonsentrasi saat belajar?',
    context: 'Topik: Konsentrasi',
    options: [
      { key: 'A', text: 'Membuka media sosial' },
      { key: 'B', text: 'Mengerjakan banyak tugas sekaligus' },
      { key: 'C', text: 'Mengurangi gangguan dan memilih tempat nyaman' },
      { key: 'D', text: 'Berhenti belajar selamanya' }
    ],
    correctAnswer: 'C',
    explanation: 'Jauhkan HP, matikan notifikasi yang tidak penting, fokus pada satu tugas, dan pilih tempat belajar yang nyaman.'
  },
  {
    id: 3,
    question: 'Teknik active recall dilakukan dengan cara ...',
    context: 'Topik: Mengingat Pelajaran',
    options: [
      { key: 'A', text: 'Membaca buku berulang kali tanpa jeda' },
      { key: 'B', text: 'Mengingat kembali materi tanpa melihat catatan' },
      { key: 'C', text: 'Menyalin seluruh isi buku' },
      { key: 'D', text: 'Meminta teman mengerjakan tugas' }
    ],
    correctAnswer: 'B',
    explanation: 'Active recall adalah latihan mengingat materi tanpa terus-menerus melihat catatan. Kamu juga dapat mencoba menjelaskan materi tanpa melihat buku.'
  },
  {
    id: 4,
    question: 'Apa tindakan terbaik untuk mengatasi kebiasaan menunda tugas?',
    context: 'Topik: Memulai Belajar',
    options: [
      { key: 'A', text: 'Menunggu sampai batas waktu' },
      { key: 'B', text: 'Mengabaikan tugas' },
      { key: 'C', text: 'Memulai dari bagian kecil dan mudah' },
      { key: 'D', text: 'Menyalin tugas teman' }
    ],
    correctAnswer: 'C',
    explanation: 'Mulailah dari tugas paling mudah, pecah tugas besar menjadi bagian kecil, atau coba aturan lima menit.'
  },
  {
    id: 5,
    question: 'Mengapa kita perlu mengerjakan tugas secara mandiri?',
    context: 'Topik: Kemandirian Belajar',
    options: [
      { key: 'A', text: 'Agar tidak perlu belajar lagi' },
      { key: 'B', text: 'Agar terlihat lebih pintar' },
      { key: 'C', text: 'Agar dapat memahami materi dan bertanggung jawab' },
      { key: 'D', text: 'Agar mendapat tugas tambahan' }
    ],
    correctAnswer: 'C',
    explanation: 'Mengerjakan tugas dengan kemampuan sendiri memberi kesempatan untuk memahami materi. Jika belum paham, bertanyalah kepada guru atau diskusikan soal bersama teman.'
  }
];

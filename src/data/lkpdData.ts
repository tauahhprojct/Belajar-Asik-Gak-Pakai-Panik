export interface HabitCheckQuestion {
  id: number;
  statement: string;
  isPositive: boolean; // positive habit (Ya is good) or negative habit (Tidak is good)
  tip: string;
}

export const AKTIVITAS_1_QUESTIONS: HabitCheckQuestion[] = [
  {
    id: 1,
    statement: 'Saya belajar secara rutin meskipun tidak ada ulangan.',
    isPositive: true,
    tip: 'Belajar rutin membantu kamu lebih siap dan tidak harus memahami banyak materi sekaligus.'
  },
  {
    id: 2,
    statement: 'Saya mempunyai jadwal belajar.',
    isPositive: true,
    tip: 'Buat jadwal sederhana yang sesuai dengan aktivitasmu.'
  },
  {
    id: 3,
    statement: 'Saya tidak menunda mengerjakan tugas sekolah.',
    isPositive: true,
    tip: 'Mulailah dari tugas paling mudah atau pecah tugas besar menjadi bagian kecil.'
  },
  {
    id: 4,
    statement: 'Saya bisa berkonsentrasi ketika belajar.',
    isPositive: true,
    tip: 'Kurangi gangguan, jauhkan HP, dan fokus pada satu tugas terlebih dahulu.'
  },
  {
    id: 5,
    statement: 'Saya mengulang materi setelah pelajaran selesai.',
    isPositive: true,
    tip: 'Mengulang materi membantu kamu mengetahui bagian yang perlu dipelajari lagi.'
  },
  {
    id: 6,
    statement: 'Saya memiliki tempat belajar yang nyaman.',
    isPositive: true,
    tip: 'Pilih tempat yang lebih tenang dan memiliki pencahayaan cukup.'
  },
  {
    id: 7,
    statement: 'Saya mengerjakan tugas dengan kemampuan sendiri.',
    isPositive: true,
    tip: 'Jika belum memahami materi, gunakan sumber belajar dan bertanyalah kepada guru.'
  },
  {
    id: 8,
    statement: 'Saya memiliki target belajar setiap hari.',
    isPositive: true,
    tip: 'Mulai dari target kecil yang realistis dan sesuai dengan aktivitasmu.'
  }
];

export interface StudyPlanForm {
  habitToFix: string;
  changeTarget: string;
  actionPlan: string;
  executionTime: string;
  supportNeeded: string;
}

export const DEFAULT_STUDY_PLAN: StudyPlanForm = {
  habitToFix: '',
  changeTarget: '',
  actionPlan: '',
  executionTime: '',
  supportNeeded: ''
};

export interface Aktivitas2Form {
  preferredTime: string;
  preferredPlace: string;
  biggestObstacle: string;
  responseToLowScore: string;
}

export const DEFAULT_AKTIVITAS_2: Aktivitas2Form = {
  preferredTime: '',
  preferredPlace: '',
  biggestObstacle: '',
  responseToLowScore: ''
};

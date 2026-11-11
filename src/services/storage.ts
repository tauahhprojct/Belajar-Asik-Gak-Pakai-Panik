import { DEFAULT_AKTIVITAS_2, DEFAULT_STUDY_PLAN, Aktivitas2Form, StudyPlanForm } from '../data/lkpdData';

export interface StudentProfile {
  name: string;
  grade: string;
  school: string;
  avatarId: number;
}

export interface QuizSavedResult {
  score: number;
  correctCount: number;
  wrongCount: number;
  totalQuestions: number;
  selectedAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  completedAt: string;
}

export interface ReflectionData {
  q1: string; // Kebiasaan belajar apa yang selama ini paling sering kamu lakukan?
  q2: string; // Apa hal baru yang kamu pelajari dari materi ini?
  q3: string; // Kebiasaan apa yang ingin kamu ubah mulai sekarang?
  savedAt: string | null;
  isSaved: boolean;
}

const STORAGE_KEYS = {
  PROFILE: 'belajarasik_profile',
  COMPLETED_MATERI: 'belajarasik_completed_materi_v2',
  LKPD_ACT1: 'belajarasik_lkpd_act1',
  LKPD_ACT2: 'belajarasik_lkpd_act2',
  STUDY_PLAN: 'belajarasik_study_plan',
  QUIZ: 'belajarasik_quiz_result',
  REFLECTION: 'belajarasik_reflection',
};

// Safe LocalStorage Helper
export const storageService = {
  // Profile
  getProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading profile:', e);
    }
    return {
      name: 'Sahabat Belajar',
      grade: 'Kelas X / SMK',
      school: 'Sekolah Menengah',
      avatarId: 1,
    };
  },

  saveProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile:', e);
    }
  },

  // Completed Materi (module IDs)
  getCompletedMateri(): number[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_MATERI);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading completed materi:', e);
    }
    return [];
  },

  toggleMateriCompleted(materiId: number): number[] {
    const list = this.getCompletedMateri();
    let updated: number[];
    if (list.includes(materiId)) {
      updated = list.filter((id) => id !== materiId);
    } else {
      updated = [...list, materiId];
    }
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_MATERI, JSON.stringify(updated));
    } catch (e) {
      console.error('Error toggling materi:', e);
    }
    return updated;
  },

  isMateriCompleted(materiId: number): boolean {
    return this.getCompletedMateri().includes(materiId);
  },

  // LKPD Activity 1 (Record of boolean answers: questionId -> boolean)
  getLkpdAct1(): Record<number, boolean> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LKPD_ACT1);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading lkpd 1:', e);
    }
    return {};
  },

  saveLkpdAct1(answers: Record<number, boolean>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LKPD_ACT1, JSON.stringify(answers));
    } catch (e) {
      console.error('Error saving lkpd 1:', e);
    }
  },

  // LKPD Activity 2
  getLkpdAct2(): Aktivitas2Form {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LKPD_ACT2);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading lkpd 2:', e);
    }
    return { ...DEFAULT_AKTIVITAS_2 };
  },

  saveLkpdAct2(form: Aktivitas2Form): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LKPD_ACT2, JSON.stringify(form));
    } catch (e) {
      console.error('Error saving lkpd 2:', e);
    }
  },

  // LKPD Activity 3: My Study Plan
  getStudyPlan(): StudyPlanForm {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDY_PLAN);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading study plan:', e);
    }
    return { ...DEFAULT_STUDY_PLAN };
  },

  saveStudyPlan(plan: StudyPlanForm): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(plan));
    } catch (e) {
      console.error('Error saving study plan:', e);
    }
  },

  // Quiz Results
  getQuizResult(): QuizSavedResult | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading quiz:', e);
    }
    return null;
  },

  saveQuizResult(result: QuizSavedResult): void {
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ, JSON.stringify(result));
    } catch (e) {
      console.error('Error saving quiz result:', e);
    }
  },

  clearQuizResult(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.QUIZ);
    } catch (e) {
      console.error('Error clearing quiz:', e);
    }
  },

  // Reflection
  getReflection(): ReflectionData {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REFLECTION);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading reflection:', e);
    }
    return {
      q1: '',
      q2: '',
      q3: '',
      savedAt: null,
      isSaved: false,
    };
  },

  saveReflection(data: ReflectionData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.REFLECTION, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving reflection:', e);
    }
  },

  // Reset all student demo data if desired
  resetAllData(): void {
    Object.values(STORAGE_KEYS).forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        console.error(e);
      }
    });
  },

  // Export all learning progress as summary
  getAllExportData() {
    return {
      profile: this.getProfile(),
      completedMateriCount: this.getCompletedMateri().length,
      lkpd1: this.getLkpdAct1(),
      lkpd2: this.getLkpdAct2(),
      studyPlan: this.getStudyPlan(),
      quiz: this.getQuizResult(),
      reflection: this.getReflection(),
      exportedAt: new Date().toLocaleString('id-ID'),
    };
  },
};

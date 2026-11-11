import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/questions';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { storageService, QuizSavedResult, StudentProfile } from '../services/storage';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Sparkles,
  FileCheck,
  Heart,
} from 'lucide-react';

export const QuizResult: React.FC = () => {
  const navigate = useNavigate();
  const quizResult: QuizSavedResult | null = storageService.getQuizResult();
  const profile: StudentProfile = storageService.getProfile();

  useEffect(() => {
    // If high score, shoot festive confetti
    if (quizResult && quizResult.score >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#155C3B', '#287A52', '#FFC93C', '#DCEEDB'],
        });
      } catch (e) {
        // Safe confetti fallback
      }
    }
  }, [quizResult]);

  if (!quizResult) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <Card variant="white" padding="xl" rounded="3xl">
          <Award className="w-16 h-16 mx-auto text-[#287A52] mb-3" />
          <h2 className="font-display font-bold text-2xl text-[#155C3B] mb-2">Belum Ada Hasil Kuis</h2>
          <p className="text-xs sm:text-sm text-[#20352B]/70 mb-6">
            Kamu belum mengerjakan kuis evaluasi kebiasaan belajar.
          </p>
          <Link to="/soal">
            <Button variant="primary">Mulai Kerjakan Kuis</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleRetake = () => {
    storageService.clearQuizResult();
    navigate('/soal');
  };

  const getScoreVerdict = (score: number) => {
    if (score === 100) {
      return {
        badge: 'Sempurna! Juara Teladan BK 🏆',
        message: 'Luar biasa! Kamu memahami cara membangun kebiasaan belajar yang lebih teratur, fokus, dan mandiri!',
        color: 'text-[#155C3B] bg-[#DCEEDB]',
      };
    } else if (score >= 80) {
      return {
        badge: 'Sangat Hebat! Bintang Belajar ⭐',
        message: 'Hebat sekali! Pemahamanmu mengenai strategi belajar efektif sudah sangat kuat. Tinggal pertahankan konsistensinya!',
        color: 'text-[#155C3B] bg-[#DCEEDB]',
      };
    } else if (score >= 60) {
      return {
        badge: 'Cukup Baik! Terus Tingkatkan 📚',
        message: 'Bagus! Kamu sudah memahami sebagian besar materi. Simak pembahasan di bawah untuk memperdalam konsep yang masih keliru.',
        color: 'text-amber-800 bg-amber-100',
      };
    } else {
      return {
        badge: 'Tetap Semangat! Jangan Menyerah 💪',
        message: 'Jangan berkecil hati! Ujian ini adalah cermin untuk mengetahui bagian mana yang perlu kamu baca ulang di menu Materi.',
        color: 'text-[#E07A5F] bg-orange-50',
      };
    }
  };

  const verdict = getScoreVerdict(quizResult.score);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Top Banner Result Card */}
      <Card
        variant="white"
        padding="xl"
        rounded="3xl"
        className="text-center space-y-6 border-2 border-[#287A52]/20 relative overflow-hidden shadow-lg"
      >
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#287A52] bg-[#DCEEDB] px-3.5 py-1.5 rounded-full inline-block">
            Hasil Evaluasi Kuis Siswa
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#155C3B]">
            Selamat, {profile.name}!
          </h1>
          <p className="text-xs sm:text-sm text-[#20352B]/70">
            Dikerjakan pada: {quizResult.completedAt}
          </p>
        </div>

        {/* Large Score Circle */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#155C3B] to-[#287A52] text-white flex flex-col items-center justify-center shadow-xl border-4 border-[#FFF9EB]">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#FFC93C]">
              Nilai Akhir
            </span>
            <span className="font-display font-extrabold text-4xl sm:text-5xl leading-none my-1">
              {quizResult.score}
            </span>
            <span className="text-[11px] text-[#DCEEDB]">Skala 100</span>
          </div>

          <div className="mt-4">
            <span className={`text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border border-current ${verdict.color}`}>
              {verdict.badge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#20352B]/85 max-w-lg mt-3 leading-relaxed">
            {verdict.message}
          </p>
        </div>

        {/* Score Stats Summary Grid */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-4 border-t border-[#287A52]/10 text-center">
          <div className="p-3 rounded-2xl bg-[#DCEEDB]/50 border border-[#287A52]/15">
            <span className="text-xs text-[#20352B]/70 block font-medium">Jawaban Benar</span>
            <span className="font-display font-extrabold text-xl text-[#155C3B] flex items-center justify-center gap-1 mt-1">
              <CheckCircle2 className="w-4 h-4 text-[#287A52]" />
              {quizResult.correctCount}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="text-xs text-[#20352B]/70 block font-medium">Jawaban Salah</span>
            <span className="font-display font-extrabold text-xl text-rose-600 flex items-center justify-center gap-1 mt-1">
              <XCircle className="w-4 h-4 text-rose-500" />
              {quizResult.wrongCount}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFF9EB] border border-[#287A52]/15">
            <span className="text-xs text-[#20352B]/70 block font-medium">Total Soal</span>
            <span className="font-display font-extrabold text-xl text-[#20352B] flex items-center justify-center gap-1 mt-1">
              <FileCheck className="w-4 h-4 text-[#287A52]" />
              {quizResult.totalQuestions}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Button
            variant="cream"
            size="md"
            onClick={handleRetake}
            icon={<RotateCcw className="w-4 h-4 text-[#287A52]" />}
          >
            Ulangi Kuis
          </Button>

          <Link to="/refleksi">
            <Button
              variant="primary"
              size="md"
              icon={<Heart className="w-4 h-4" />}
              iconPosition="right"
            >
              Lanjut ke Refleksi Diri
            </Button>
          </Link>
        </div>
      </Card>

      {/* Pembahasan Soal Section (Deep Review) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#155C3B]" />
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#155C3B]">
            Pembahasan Lengkap Setiap Soal
          </h2>
        </div>

        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const studentChoice = quizResult.selectedAnswers[q.id];
            const isCorrect = studentChoice === q.correctAnswer;
            const chosenOption = q.options.find((o) => o.key === studentChoice);
            const correctOption = q.options.find((o) => o.key === q.correctAnswer);

            return (
              <Card
                key={q.id}
                variant="white"
                padding="lg"
                rounded="2xl"
                className={`border-2 space-y-4 ${
                  isCorrect ? 'border-[#287A52]/30 bg-white' : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                {/* Question Header & Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#DCEEDB] text-[#155C3B] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#287A52]">
                        {q.context}
                      </span>
                      <h3 className="font-display font-bold text-sm sm:text-base text-[#155C3B] mt-0.5">
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                      isCorrect
                        ? 'bg-[#DCEEDB] text-[#155C3B]'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#287A52]" />
                        Benar (+20)
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-rose-500" />
                        Kurang Tepat
                      </>
                    )}
                  </span>
                </div>

                {/* Answers Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3 rounded-xl border ${isCorrect ? 'bg-[#DCEEDB]/40 border-[#287A52]/20' : 'bg-rose-50 border-rose-200'}`}>
                    <span className="font-bold text-[#20352B]/70 block mb-1">
                      Jawaban Kamu:
                    </span>
                    <p className="font-semibold text-[#20352B]">
                      {studentChoice ? `${studentChoice}. ${chosenOption?.text}` : 'Tidak dijawab'}
                    </p>
                  </div>

                  {!isCorrect && (
                    <div className="p-3 rounded-xl bg-[#DCEEDB]/60 border border-[#287A52]/30">
                      <span className="font-bold text-[#155C3B] block mb-1">
                        Kunci Jawaban yang Benar:
                      </span>
                      <p className="font-semibold text-[#155C3B]">
                        {q.correctAnswer}. {correctOption?.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Explanation Box */}
                <div className="p-3.5 rounded-2xl bg-[#FFF9EB] border border-[#287A52]/15 text-xs text-[#20352B]/90 space-y-1">
                  <span className="font-bold text-[#155C3B] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFC93C]" />
                    Pembahasan Edukasi BK:
                  </span>
                  <p className="leading-relaxed font-medium">{q.explanation}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom Nav to Reflection & Conclusion */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#287A52]/15">
        <Link to="/materi" className="w-full sm:w-auto">
          <Button variant="outline" size="md" fullWidth icon={<BookOpen className="w-4 h-4" />}>
            Pelajari Materi Lagi
          </Button>
        </Link>

        <Link to="/refleksi" className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="md"
            fullWidth
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Lanjut ke Halaman Refleksi
          </Button>
        </Link>
      </div>

    </div>
  );
};

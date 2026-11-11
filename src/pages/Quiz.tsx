import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QUIZ_QUESTIONS, QuestionItem } from '../data/questions';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { storageService, QuizSavedResult } from '../services/storage';
import { supabaseSync, isSupabaseConfigured } from '../services/supabase';
import { HelpCircle, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export const Quiz: React.FC = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentQuestion: QuestionItem = QUIZ_QUESTIONS[currentIndex];
  const currentSelection = selectedAnswers[currentQuestion.id];

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: key,
    });
    setValidationError(null);
  };

  const handleNext = async () => {
    // Validation check: Question must be answered before proceeding
    if (!currentSelection) {
      setValidationError('Silakan pilih salah satu jawaban terlebih dahulu sebelum melanjutkan!');
      return;
    }

    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setValidationError(null);
    } else {
      // Calculate Score: Nilai = (Jumlah jawaban benar / Total soal) * 100
      let correctCount = 0;
      QUIZ_QUESTIONS.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });
      const totalQuestions = QUIZ_QUESTIONS.length;
      const wrongCount = totalQuestions - correctCount;
      const score = Math.round((correctCount / totalQuestions) * 100);

      const result: QuizSavedResult = {
        score,
        correctCount,
        wrongCount,
        totalQuestions,
        selectedAnswers,
        completedAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      // Save to localStorage
      storageService.saveQuizResult(result);

      // Save to Supabase if configured
      if (isSupabaseConfigured) {
        await supabaseSync.syncQuizResult(result);
      }

      // Navigate to Quiz Result page
      navigate('/soal/hasil');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setValidationError(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      
      {/* Top Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DCEEDB] text-[#155C3B] text-xs font-bold border border-[#287A52]/20">
          <HelpCircle className="w-3.5 h-3.5 text-[#287A52]" />
          <span>Kuis Pilihan Ganda Kebiasaan Belajar</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#155C3B]">
          Uji Pemahaman Belajar Asik
        </h1>
        <p className="text-xs sm:text-sm text-[#20352B]/75 max-w-lg mx-auto">
          Jawablah 5 pertanyaan berikut secara teliti. Setiap soal memiliki satu jawaban paling tepat.
        </p>
      </div>

      {/* Progress Bar Card */}
      <Card variant="cream" padding="sm" rounded="2xl" className="border border-[#287A52]/15">
        <ProgressBar
          current={currentIndex + 1}
          total={QUIZ_QUESTIONS.length}
          label={`Soal Nomor ${currentIndex + 1} dari ${QUIZ_QUESTIONS.length}`}
        />
      </Card>

      {/* Question Card */}
      <Card variant="white" padding="lg" rounded="3xl" className="space-y-6 shadow-md border-2 border-[#287A52]/15">
        {/* Context badge & Question prompt */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#287A52] bg-[#DCEEDB]/70 px-3 py-1 rounded-full">
              {currentQuestion.context || 'Evaluasi Mandiri'}
            </span>
            <span className="text-xs text-[#20352B]/60 font-medium">
              Poin Maksimal: 20/soal
            </span>
          </div>

          <h2 className="font-display font-bold text-base sm:text-lg text-[#155C3B] leading-snug">
            {currentIndex + 1}. {currentQuestion.question}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt) => {
            const isSelected = currentSelection === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleSelectOption(opt.key)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#DCEEDB] border-[#155C3B] shadow-xs'
                    : 'bg-white border-[#287A52]/15 hover:border-[#287A52]/40 hover:bg-[#FFF9EB]/50'
                }`}
              >
                {/* Option badge circle */}
                <div
                  className={`w-8 h-8 rounded-xl font-display font-bold text-sm flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#155C3B] text-white'
                      : 'bg-[#FFF9EB] text-[#155C3B] border border-[#287A52]/20'
                  }`}
                >
                  {opt.key}
                </div>

                {/* Option text */}
                <p className={`text-xs sm:text-sm pt-1 leading-relaxed ${isSelected ? 'font-bold text-[#155C3B]' : 'text-[#20352B]'}`}>
                  {opt.text}
                </p>
              </button>
            );
          })}
        </div>

        {/* Validation Warning Notice */}
        {validationError && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-semibold">{validationError}</span>
          </div>
        )}

        {/* Navigation Buttons: Previous & Next / Finish */}
        <div className="pt-4 border-t border-[#287A52]/10 flex items-center justify-between gap-3">
          <Button
            variant="cream"
            size="md"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Sebelumnya
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            {currentIndex === QUIZ_QUESTIONS.length - 1 ? 'Selesai & Lihat Nilai' : 'Soal Selanjutnya'}
          </Button>
        </div>
      </Card>

    </div>
  );
};

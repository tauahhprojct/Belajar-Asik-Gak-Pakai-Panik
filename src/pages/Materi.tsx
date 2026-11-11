import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MATERI_DATA } from '../data/materi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { storageService } from '../services/storage';
import {
  Brain,
  CalendarCheck,
  Clock,
  Flame,
  Target,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export const Materi: React.FC = () => {
  const [completedList, setCompletedList] = useState<number[]>(storageService.getCompletedMateri());

  const getMateriIcon = (iconName: string) => {
    const props = { className: 'w-7 h-7 sm:w-8 sm:h-8 text-[#155C3B]' };
    switch (iconName) {
      case 'Brain':
        return <Brain {...props} />;
      case 'CalendarCheck':
        return <CalendarCheck {...props} />;
      case 'Clock':
        return <Clock {...props} />;
      case 'Flame':
        return <Flame {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />;
      case 'Target':
        return <Target {...props} />;
      case 'Lightbulb':
        return <Lightbulb {...props} className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      default:
        return <BookOpen {...props} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCEEDB] text-[#155C3B] text-xs font-bold border border-[#287A52]/20">
          <BookOpen className="w-4 h-4 text-[#287A52]" />
          <span>{MATERI_DATA.length} Modul Panduan Utama</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#155C3B]">
          Daftar Materi Kebiasaan Belajar Efektif
        </h1>
        <p className="text-sm sm:text-base text-[#20352B]/80 leading-relaxed">
          Kenali kebiasaan belajar yang perlu diperbaiki dan temukan langkah sederhana untuk belajar lebih teratur, fokus, dan mandiri.
        </p>

        {/* Learning Progress Meter */}
        <div className="pt-4 max-w-md mx-auto">
          <ProgressBar
            current={completedList.length}
            total={MATERI_DATA.length}
            label={`Progres Membaca: ${completedList.length} dari ${MATERI_DATA.length} materi selesai`}
          />
        </div>
      </div>

      {/* Materi Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MATERI_DATA.map((item, index) => {
          const isDone = completedList.includes(item.id);
          return (
            <Card
              key={item.id}
              variant="white"
              padding="lg"
              rounded="3xl"
              hoverEffect
              className={`flex flex-col justify-between border-2 transition-all relative ${
                isDone ? 'border-[#287A52]/40 bg-[#DCEEDB]/10' : 'border-[#287A52]/10'
              }`}
            >
              {/* Top row: Module index & Status badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-extrabold text-xs px-2.5 py-1 rounded-full bg-[#DCEEDB] text-[#155C3B]">
                  Materi {index + 1}
                </span>

                {isDone ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#155C3B] bg-[#DCEEDB] px-2.5 py-1 rounded-full border border-[#287A52]/30">
                    <CheckCircle className="w-3.5 h-3.5 text-[#287A52]" />
                    Sudah Dipelajari
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-[#20352B]/60 bg-gray-100 px-2.5 py-1 rounded-full">
                    {item.estimatedMinutes} menit baca
                  </span>
                )}
              </div>

              {/* Icon & Title */}
              <div className="space-y-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#DCEEDB]/70 flex items-center justify-center p-3 border border-[#287A52]/20">
                  {getMateriIcon(item.iconName)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#155C3B] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#20352B]/75 mt-1.5 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#287A52]/10">
                <Link to={`/materi/${item.slug}`} className="block">
                  <Button
                    variant={isDone ? 'light' : 'primary'}
                    fullWidth
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    {isDone ? 'Baca Ulang Materi' : 'Pelajari Materi Ini'}
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Bottom helper card to LKPD */}
      <Card variant="cream" padding="lg" rounded="3xl" className="border border-[#287A52]/20 text-center">
        <h3 className="font-display font-bold text-xl text-[#155C3B] mb-2">
          Sudah Selesai Membaca Materi?
        </h3>
        <p className="text-sm text-[#20352B]/75 max-w-xl mx-auto mb-4">
          Langkah berikutnya adalah mengevaluasi kebiasaan belajarmu sendiri lewat Lembar Kerja Peserta Didik (LKPD) dan uji pemahaman lewat kuis!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/lkpd">
            <Button variant="secondary" size="md">
              Buka LKPD Interaktif
            </Button>
          </Link>
          <Link to="/soal">
            <Button variant="outline" size="md">
              Uji Kemampuan di Kuis
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

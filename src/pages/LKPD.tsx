import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import {
  AKTIVITAS_1_QUESTIONS,
  StudyPlanForm,
  Aktivitas2Form,
  DEFAULT_AKTIVITAS_2,
  DEFAULT_STUDY_PLAN,
} from '../data/lkpdData';
import { storageService, StudentProfile } from '../services/storage';
import { supabaseSync, isSupabaseConfigured } from '../services/supabase';
import {
  ClipboardCheck,
  Check,
  X,
  Sparkles,
  Save,
  Edit3,
  Printer,
  Calendar,
  Heart,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  HelpCircle,
  FileText,
} from 'lucide-react';

export const LKPD: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'act1' | 'act2' | 'act3'>('act1');
  const [profile, setProfile] = useState<StudentProfile>(storageService.getProfile());

  // Activity 1 State
  const [act1Answers, setAct1Answers] = useState<Record<number, boolean>>({});
  const [act1Saved, setAct1Saved] = useState(false);

  // Activity 2 State
  const [act2Form, setAct2Form] = useState<Aktivitas2Form>(DEFAULT_AKTIVITAS_2);
  const [act2Saved, setAct2Saved] = useState(false);
  const [act2IsEditing, setAct2IsEditing] = useState(true);

  // Activity 3: My Study Plan State
  const [studyPlan, setStudyPlan] = useState<StudyPlanForm>(DEFAULT_STUDY_PLAN);
  const [studyPlanSaved, setStudyPlanSaved] = useState(false);
  const [studyPlanIsEditing, setStudyPlanIsEditing] = useState(true);

  // Load saved data on mount
  useEffect(() => {
    setProfile(storageService.getProfile());

    // Load Act 1
    const savedAct1 = storageService.getLkpdAct1();
    if (Object.keys(savedAct1).length > 0) {
      setAct1Answers(savedAct1);
      setAct1Saved(true);
    }

    // Load Act 2
    const savedAct2 = storageService.getLkpdAct2();
    if (savedAct2.preferredTime || savedAct2.biggestObstacle) {
      setAct2Form(savedAct2);
      setAct2Saved(true);
      setAct2IsEditing(false);
    }

    // Load Act 3 Study Plan
    const savedPlan = storageService.getStudyPlan();
    if (savedPlan.habitToFix || savedPlan.actionPlan) {
      setStudyPlan(savedPlan);
      setStudyPlanSaved(true);
      setStudyPlanIsEditing(false);
    }
  }, []);

  // Act 1 Handlers
  const handleAct1Choice = (questionId: number, value: boolean) => {
    const updated = { ...act1Answers, [questionId]: value };
    setAct1Answers(updated);
    storageService.saveLkpdAct1(updated);
    setAct1Saved(true);
  };

  // Calculate Act 1 Score
  const calculateGoodHabitsCount = () => {
    let count = 0;
    AKTIVITAS_1_QUESTIONS.forEach((q) => {
      const ans = act1Answers[q.id];
      if (ans !== undefined) {
        if ((q.isPositive && ans === true) || (!q.isPositive && ans === false)) {
          count++;
        }
      }
    });
    return count;
  };

  // Act 2 Handlers
  const handleSaveAct2 = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveLkpdAct2(act2Form);
    setAct2Saved(true);
    setAct2IsEditing(false);
  };

  // Act 3 Study Plan Handlers
  const handleSaveStudyPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveStudyPlan(studyPlan);
    setStudyPlanSaved(true);
    setStudyPlanIsEditing(false);

    // Sync with Supabase if configured
    if (isSupabaseConfigured) {
      await supabaseSync.syncStudyPlan(studyPlan);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const totalAct1Answered = Object.keys(act1Answers).length;
  const goodHabitsCount = calculateGoodHabitsCount();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Title & Petunjuk Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEEDB] text-[#155C3B] text-xs font-bold border border-[#287A52]/20 mb-1">
              <ClipboardCheck className="w-3.5 h-3.5 text-[#287A52]" />
              <span>Lembar Kerja Peserta Didik (LKPD)</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#155C3B]">
              Refleksi & Rencana Belajar Mandiri
            </h1>
          </div>

          <button
            onClick={handlePrint}
            className="no-print inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-[#155C3B] border border-[#287A52]/20 hover:bg-[#DCEEDB]/60 shadow-xs transition-all text-sm font-semibold cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#287A52]" />
            <span>Cetak Lembar LKPD</span>
          </button>
        </div>

        {/* Petunjuk Pengisian */}
        <Card variant="lightGreen" padding="md" rounded="2xl" className="border border-[#287A52]/20">
          <h3 className="font-display font-bold text-sm text-[#155C3B] flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-[#FFC93C]" />
            Petunjuk Pengisian LKPD:
          </h3>
          <ol className="list-decimal list-inside text-xs sm:text-sm text-[#20352B]/90 space-y-1 font-medium">
            <li>Bacalah setiap pertanyaan dengan cermat.</li>
            <li>Isi jawaban sesuai keadaanmu yang sebenarnya tanpa rasa takut dinilai salah.</li>
            <li>Gunakan jawaban yang jujur karena ini adalah cermin untuk kemajuan belajarmu sendiri.</li>
          </ol>
        </Card>

        {/* Student Profile Info Bar (Print and Screen friendly) */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#287A52]/15 flex flex-wrap items-center justify-between text-xs sm:text-sm gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <span className="text-[#20352B]/60 text-[11px] block">Nama Siswa:</span>
              <span className="font-bold text-[#155C3B]">{profile.name}</span>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <span className="text-[#20352B]/60 text-[11px] block">Kelas:</span>
              <span className="font-semibold text-[#20352B]">{profile.grade}</span>
            </div>
            <div className="border-l border-gray-200 pl-4">
              <span className="text-[#20352B]/60 text-[11px] block">Sekolah:</span>
              <span className="font-semibold text-[#20352B]">{profile.school}</span>
            </div>
          </div>
          <span className="text-[11px] text-[#287A52] font-semibold bg-[#DCEEDB]/70 px-2.5 py-1 rounded-full">
            Data Tersimpan Otomatis
          </span>
        </div>
      </div>

      {/* Activity Navigation Tabs */}
      <div className="no-print flex rounded-2xl bg-[#DCEEDB]/50 p-1.5 border border-[#287A52]/15 gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveTab('act1')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'act1'
              ? 'bg-[#155C3B] text-white shadow-sm'
              : 'text-[#155C3B] hover:bg-[#DCEEDB]'
          }`}
        >
          <span>Aktivitas 1</span>
          <span className="text-[11px] font-normal opacity-90 hidden sm:inline">(Kenali Diri)</span>
          {totalAct1Answered === AKTIVITAS_1_QUESTIONS.length && (
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC93C]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('act2')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'act2'
              ? 'bg-[#155C3B] text-white shadow-sm'
              : 'text-[#155C3B] hover:bg-[#DCEEDB]'
          }`}
        >
          <span>Aktivitas 2</span>
          <span className="text-[11px] font-normal opacity-90 hidden sm:inline">(Evaluasi)</span>
          {act2Saved && <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC93C]" />}
        </button>

        <button
          onClick={() => setActiveTab('act3')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'act3'
              ? 'bg-[#155C3B] text-white shadow-sm'
              : 'text-[#155C3B] hover:bg-[#DCEEDB]'
          }`}
        >
          <span>Aktivitas 3</span>
          <span className="text-[11px] font-normal opacity-90 hidden sm:inline">(My Study Plan)</span>
          {studyPlanSaved && <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC93C]" />}
        </button>
      </div>

      {/* ============================================================== */}
      {/* AKTIVITAS 1: KENALI KEBIASAANMU (YA / TIDAK)                   */}
      {/* ============================================================== */}
      {activeTab === 'act1' && (
        <Card variant="white" padding="lg" rounded="3xl" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#287A52]/10 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#287A52]">
                Aktivitas 1
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#155C3B]">
                Kenali Kebiasaan Belajarmu!
              </h2>
              <p className="text-xs sm:text-sm text-[#20352B]/75 mt-0.5">
                Pilih jawaban "Ya" atau "Tidak" sesuai kebiasaan belajarmu selama ini.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#20352B]/60 block">Status Terisi</span>
              <span className="font-bold text-sm text-[#155C3B]">
                {totalAct1Answered} dari {AKTIVITAS_1_QUESTIONS.length} Pertanyaan
              </span>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-3">
            {AKTIVITAS_1_QUESTIONS.map((q, idx) => {
              const currentVal = act1Answers[q.id];
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    currentVal !== undefined
                      ? 'bg-[#FFF9EB]/40 border-[#287A52]/25'
                      : 'bg-white border-[#287A52]/15 hover:border-[#287A52]/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-[#DCEEDB] text-[#155C3B] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-[#20352B]">
                          {q.statement}
                        </p>
                        {currentVal !== undefined && (
                          <p className="text-[11px] text-[#287A52] mt-1 flex items-center gap-1 font-medium">
                            <Sparkles className="w-3 h-3 text-[#FFC93C]" />
                            {q.tip}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Ya / Tidak Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleAct1Choice(q.id, true)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          currentVal === true
                            ? 'bg-[#155C3B] text-white shadow-xs'
                            : 'bg-[#DCEEDB]/70 hover:bg-[#DCEEDB] text-[#155C3B]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Ya</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAct1Choice(q.id, false)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          currentVal === false
                            ? 'bg-[#E07A5F] text-white shadow-xs'
                            : 'bg-gray-100 hover:bg-gray-200 text-[#20352B]/80'
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Tidak</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Diagnostic Result Box */}
          {totalAct1Answered === AKTIVITAS_1_QUESTIONS.length && (
            <div className="p-5 rounded-3xl bg-[#DCEEDB] border-2 border-[#287A52]/30 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#287A52]" />
                <h3 className="font-display font-bold text-base sm:text-lg text-[#155C3B]">
                  Hasil Diagnostik Kebiasaan Belajarmu:
                </h3>
              </div>
              <p className="text-sm text-[#20352B]/90 font-medium">
                Kamu memiliki{' '}
                <strong className="text-[#155C3B] font-bold">{goodHabitsCount} kebiasaan positif</strong>{' '}
                dari {AKTIVITAS_1_QUESTIONS.length} aspek yang dinilai.
              </p>
              <div className="p-3 bg-white/80 rounded-2xl text-xs text-[#20352B]/80">
                {goodHabitsCount >= 6 ? (
                  <span className="text-[#155C3B] font-bold">
                    Luar biasa! Kamu sudah memiliki pondasi kebiasaan belajar yang sangat matang. Terus pertahankan konsistensimu!
                  </span>
                ) : goodHabitsCount >= 4 ? (
                  <span className="text-amber-800 font-bold">
                    Bagus! Kamu sudah berada di jalur yang benar, namun masih ada beberapa kebiasaan (seperti menunda atau godaan HP) yang perlu dibenahi.
                  </span>
                ) : (
                  <span className="text-[#E07A5F] font-bold">
                    Jangan panik! Ini kesempatan untuk memperbaiki kebiasaan belajar. Pelajari materi dan susun rencanamu di Aktivitas 3!
                  </span>
                )}
              </div>
              <div className="pt-2 flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveTab('act2')}
                >
                  Lanjut ke Aktivitas 2 →
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* ============================================================== */}
      {/* AKTIVITAS 2: EVALUASI KEBIASAAN BELAJAR (PILIHAN & ISIAN)      */}
      {/* ============================================================== */}
      {activeTab === 'act2' && (
        <Card variant="white" padding="lg" rounded="3xl" className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#287A52]/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#287A52]">
                Aktivitas 2
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#155C3B]">
                Evaluasi Kebiasaan Belajar
              </h2>
              <p className="text-xs sm:text-sm text-[#20352B]/75 mt-0.5">
                Kenali preferensi waktu, tempat, dan tantangan terbesarmu saat belajar.
              </p>
            </div>

            {act2Saved && !act2IsEditing && (
              <Button
                variant="cream"
                size="sm"
                icon={<Edit3 className="w-3.5 h-3.5" />}
                onClick={() => setAct2IsEditing(true)}
              >
                Edit Jawaban
              </Button>
            )}
          </div>

          <form onSubmit={handleSaveAct2} className="space-y-6">
            {/* Question 1: Waktu Belajar (Pilihan) */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#155C3B] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#287A52]" />
                1. Kapan waktu yang paling nyaman dan membuatmu fokus saat belajar di rumah?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Pagi Hari / Subuh (Pikiran masih segar)',
                  'Sore Hari setelah pulang sekolah',
                  'Malam Hari (Pukul 19.00 - 21.00 WIB)',
                  'Larut Malam menjelang tidur',
                ].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      act2Form.preferredTime === opt
                        ? 'bg-[#DCEEDB] border-[#287A52] font-semibold text-[#155C3B]'
                        : 'bg-white border-[#287A52]/15 hover:bg-[#FFF9EB]/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredTime"
                      disabled={!act2IsEditing}
                      checked={act2Form.preferredTime === opt}
                      onChange={() => setAct2Form({ ...act2Form, preferredTime: opt })}
                      className="accent-[#155C3B]"
                      required
                    />
                    <span className="text-xs sm:text-sm">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 2: Tempat Belajar (Pilihan) */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#155C3B] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#287A52]" />
                2. Di mana tempat belajar yang paling kamu sukai?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Meja belajar khusus di kamar yang rapi',
                  'Ruang tamu / Ruang keluarga bersama keluarga',
                  'Atas kasur empuk dengan bantal',
                  'Perpustakaan sekolah / Ruang bersama yang tenang',
                ].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      act2Form.preferredPlace === opt
                        ? 'bg-[#DCEEDB] border-[#287A52] font-semibold text-[#155C3B]'
                        : 'bg-white border-[#287A52]/15 hover:bg-[#FFF9EB]/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredPlace"
                      disabled={!act2IsEditing}
                      checked={act2Form.preferredPlace === opt}
                      onChange={() => setAct2Form({ ...act2Form, preferredPlace: opt })}
                      className="accent-[#155C3B]"
                      required
                    />
                    <span className="text-xs sm:text-sm">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 3: Kendala Terbesar (Isian) */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#155C3B] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                3. Apa godaan atau kendala terbesar yang paling sering merusak konsentrasi belajarmu? (Isian Singkat)
              </label>
              <textarea
                rows={3}
                required
                disabled={!act2IsEditing}
                value={act2Form.biggestObstacle}
                onChange={(e) => setAct2Form({ ...act2Form, biggestObstacle: e.target.value })}
                placeholder="Contoh: Godaan membuka TikTok dan game online di HP saat merasa bosan membaca materi panjang..."
                className="w-full px-4 py-3 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/40 text-xs sm:text-sm leading-relaxed disabled:opacity-75"
              />
            </div>

            {/* Question 4: Reaksi Terhadap Nilai (Isian) */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#155C3B] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#E24E42]" />
                4. Apa yang biasanya kamu rasakan dan lakukan ketika mendapatkan nilai ulangan yang belum memuaskan? (Isian Singkat)
              </label>
              <textarea
                rows={3}
                required
                disabled={!act2IsEditing}
                value={act2Form.responseToLowScore}
                onChange={(e) => setAct2Form({ ...act2Form, responseToLowScore: e.target.value })}
                placeholder="Contoh: Merasa sedih sebentar, tapi lalu mencari tahu bagian mana yang salah dan berniat belajar ulang bab tersebut..."
                className="w-full px-4 py-3 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/40 text-xs sm:text-sm leading-relaxed disabled:opacity-75"
              />
            </div>

            {/* Submit / Status Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              {act2Saved && !act2IsEditing ? (
                <div className="flex items-center gap-2 text-xs text-[#155C3B] font-bold bg-[#DCEEDB] px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-[#287A52]" />
                  <span>Jawaban Aktivitas 2 Tersimpan</span>
                </div>
              ) : (
                <span className="text-xs text-[#20352B]/60">Pastikan semua kolom terisi dengan jujur.</span>
              )}

              {act2IsEditing && (
                <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                  Simpan Jawaban Aktivitas 2
                </Button>
              )}

              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setActiveTab('act3')}
              >
                Lanjut ke My Study Plan →
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* ============================================================== */}
      {/* AKTIVITAS 3: MY STUDY PLAN                                     */}
      {/* ============================================================== */}
      {activeTab === 'act3' && (
        <Card variant="white" padding="lg" rounded="3xl" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#287A52]/10 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#287A52]">
                Aktivitas 3
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#155C3B]">
                My Study Plan (Rencana Perubahan Belajar)
              </h2>
              <p className="text-xs sm:text-sm text-[#20352B]/75 mt-0.5">
                Susun komitmen aksi nyata untuk membangun kebiasaan belajar yang efektif dan konsisten.
              </p>
            </div>

            {studyPlanSaved && !studyPlanIsEditing && (
              <Button
                variant="cream"
                size="sm"
                icon={<Edit3 className="w-3.5 h-3.5" />}
                onClick={() => setStudyPlanIsEditing(true)}
              >
                Edit Rencana
              </Button>
            )}
          </div>

          <form onSubmit={handleSaveStudyPlan} className="space-y-5">
            {/* 1. Kebiasaan yang ingin diperbaiki */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-[#155C3B] uppercase tracking-wider">
                1. Kebiasaan yang Ingin Saya Perbaiki:
              </label>
              <input
                type="text"
                required
                disabled={!studyPlanIsEditing}
                value={studyPlan.habitToFix}
                onChange={(e) => setStudyPlan({ ...studyPlan, habitToFix: e.target.value })}
                placeholder="Contoh: Belajar hanya ketika ada ulangan dan sering menunda tugas"
                className="w-full px-4 py-3 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/40 text-xs sm:text-sm disabled:opacity-75 font-medium"
              />
            </div>

            {/* 2. Target Perubahan */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-[#155C3B] uppercase tracking-wider">
                2. Target Perubahan:
              </label>
              <input
                type="text"
                required
                disabled={!studyPlanIsEditing}
                value={studyPlan.changeTarget}
                onChange={(e) => setStudyPlan({ ...studyPlan, changeTarget: e.target.value })}
                placeholder="Contoh: Belajar teratur 30 menit setiap hari tanpa distraksi smartphone"
                className="w-full px-4 py-3 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/40 text-xs sm:text-sm disabled:opacity-75 font-medium"
              />
            </div>

            {/* 3. Cara Mengatasinya */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-[#155C3B] uppercase tracking-wider">
                3. Cara Mengatasinya (Langkah Aksi Nyata):
              </label>
              <textarea
                rows={3}
                required
                disabled={!studyPlanIsEditing}
                value={studyPlan.actionPlan}
                onChange={(e) => setStudyPlan({ ...studyPlan, actionPlan: e.target.value })}
                placeholder="Contoh: Membuat rangkuman, berlatih active recall, dan mengurangi gangguan HP saat belajar."
                className="w-full px-4 py-3 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/40 text-xs sm:text-sm disabled:opacity-75 leading-relaxed font-medium"
              />
            </div>

            {/* 4. Waktu Pelaksanaan */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-[#155C3B] uppercase tracking-wider">
                4. Waktu Pelaksanaan:
              </label>
              <input
                type="text"
                required
                disabled={!studyPlanIsEditing}
                value={studyPlan.executionTime}
                onChange={(e) => setStudyPlan({ ...studyPlan, executionTime: e.target.value })}
                placeholder="Contoh: Mulai besok malam, setiap pukul 19.30 - 20.30 WIB"
                className="w-full px-4 py-3 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/40 text-xs sm:text-sm disabled:opacity-75 font-medium"
              />
            </div>

            {/* 5. Dukungan yang Dibutuhkan */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-[#155C3B] uppercase tracking-wider">
                5. Dukungan yang Dibutuhkan:
              </label>
              <input
                type="text"
                required
                disabled={!studyPlanIsEditing}
                value={studyPlan.supportNeeded}
                onChange={(e) => setStudyPlan({ ...studyPlan, supportNeeded: e.target.value })}
                placeholder="Contoh: Bantuan orang tua mengingatkan jam belajar, dan teman kelompok untuk saling mengecek PR"
                className="w-full px-4 py-3 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/40 text-xs sm:text-sm disabled:opacity-75 font-medium"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {studyPlanSaved && !studyPlanIsEditing ? (
                  <div className="flex items-center gap-2 text-xs text-[#155C3B] font-bold bg-[#DCEEDB] px-3.5 py-2 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-[#287A52]" />
                    <span>My Study Plan Siap Diterapkan!</span>
                  </div>
                ) : (
                  <span className="text-xs text-[#20352B]/60">Tekan simpan untuk mengunci komitmenmu.</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {studyPlanIsEditing && (
                  <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                    Simpan Study Plan
                  </Button>
                )}
                <Button
                  type="button"
                  variant="cream"
                  size="md"
                  onClick={handlePrint}
                  icon={<Printer className="w-4 h-4 text-[#287A52]" />}
                >
                  Cetak / Simpan PDF
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}

      {/* Printable Sheet View for Teachers / Guru BK (only renders nicely on print or preview) */}
      <div className="hidden print:block p-8 bg-white text-black space-y-6">
        <div className="text-center border-b-2 border-black pb-4">
          <h2 className="text-xl font-bold uppercase">Lembar Kerja Peserta Didik (LKPD)</h2>
          <h3 className="text-sm font-semibold">Layanan Informasi Bimbingan dan Konseling (BK)</h3>
          <p className="text-xs">Topik: Membangun Kebiasaan Belajar Efektif, Manajemen Waktu, dan Konsentrasi</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p><strong>Nama:</strong> {profile.name}</p>
            <p><strong>Kelas:</strong> {profile.grade}</p>
          </div>
          <div>
            <p><strong>Sekolah:</strong> {profile.school}</p>
            <p><strong>Tanggal Cetak:</strong> {new Date().toLocaleDateString('id-ID')}</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="border p-3 rounded">
            <h4 className="font-bold mb-1">Aktivitas 1: Hasil Kenali Diri</h4>
            <p>Jumlah Kebiasaan Positif: {goodHabitsCount} dari {AKTIVITAS_1_QUESTIONS.length} butir kebiasaan.</p>
          </div>

          <div className="border p-3 rounded space-y-1">
            <h4 className="font-bold mb-1">Aktivitas 2: Evaluasi Kebiasaan</h4>
            <p><strong>Waktu Belajar Nyaman:</strong> {act2Form.preferredTime || '-'}</p>
            <p><strong>Tempat Belajar Favorit:</strong> {act2Form.preferredPlace || '-'}</p>
            <p><strong>Kendala Terbesar:</strong> {act2Form.biggestObstacle || '-'}</p>
            <p><strong>Sikap Hadapi Nilai Rendah:</strong> {act2Form.responseToLowScore || '-'}</p>
          </div>

          <div className="border p-3 rounded space-y-1">
            <h4 className="font-bold mb-1">Aktivitas 3: My Study Plan</h4>
            <p><strong>Kebiasaan yang Ingin Diperbaiki:</strong> {studyPlan.habitToFix || '-'}</p>
            <p><strong>Target Perubahan:</strong> {studyPlan.changeTarget || '-'}</p>
            <p><strong>Langkah Cara Mengatasi:</strong> {studyPlan.actionPlan || '-'}</p>
            <p><strong>Waktu Pelaksanaan:</strong> {studyPlan.executionTime || '-'}</p>
            <p><strong>Dukungan Dibutuhkan:</strong> {studyPlan.supportNeeded || '-'}</p>
          </div>
        </div>

        <div className="pt-8 flex justify-between text-xs text-center">
          <div>
            <p>Mengetahui,</p>
            <p className="mt-12 font-bold">( Guru Pembimbing BK )</p>
          </div>
          <div>
            <p>Siswa Yang Bersangkutan,</p>
            <p className="mt-12 font-bold">( {profile.name} )</p>
          </div>
        </div>
      </div>

    </div>
  );
};

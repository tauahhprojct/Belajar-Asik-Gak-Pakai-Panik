import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { storageService, ReflectionData, StudentProfile } from '../services/storage';
import { supabaseSync, isSupabaseConfigured } from '../services/supabase';
import {
  Heart,
  Save,
  Edit3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  BookOpen,
  Award,
} from 'lucide-react';

export const Reflection: React.FC = () => {
  const [reflection, setReflection] = useState<ReflectionData>(storageService.getReflection());
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const profile: StudentProfile = storageService.getProfile();

  useEffect(() => {
    const data = storageService.getReflection();
    if (data.isSaved && (data.q1 || data.q2 || data.q3)) {
      setReflection(data);
      setIsEditing(false);
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const updatedData: ReflectionData = {
      ...reflection,
      isSaved: true,
      savedAt: timestamp,
    };

    setReflection(updatedData);
    storageService.saveReflection(updatedData);
    setIsEditing(false);
    setSaveSuccessMessage('Refleksi diri berhasil disimpan!');

    if (isSupabaseConfigured) {
      await supabaseSync.syncReflection(updatedData);
    }

    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DCEEDB] text-[#155C3B] text-xs font-bold border border-[#287A52]/20">
          <Heart className="w-3.5 h-3.5 text-[#E24E42]" />
          <span>Ruang Refleksi Siswa</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#155C3B]">
          Refleksi Diri yang Bermakna
        </h1>
        <p className="text-xs sm:text-sm text-[#20352B]/80 max-w-xl mx-auto leading-relaxed">
          Belajar tanpa refleksi bagaikan makan tanpa dicerna. Luangkan sejenak waktumu untuk menuangkan perasaan dan komitmen belajarmu dengan jujur.
        </p>
      </div>

      {/* Main Reflection Form Card */}
      <Card variant="white" padding="xl" rounded="3xl" className="space-y-6 border-2 border-[#287A52]/15 shadow-md">
        
        {/* Top Status & Edit Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#287A52]/10 gap-3">
          <div>
            <span className="text-xs text-[#20352B]/60 block">Siswa Pengisi:</span>
            <span className="font-bold text-sm text-[#155C3B]">{profile.name} ({profile.grade})</span>
          </div>

          <div className="flex items-center gap-2">
            {reflection.isSaved && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DCEEDB] text-[#155C3B] text-xs font-bold border border-[#287A52]/20">
                <CheckCircle2 className="w-4 h-4 text-[#287A52]" />
                <span>Jawaban Tersimpan ({reflection.savedAt || 'Hari ini'})</span>
              </div>
            )}

            {reflection.isSaved && !isEditing && (
              <Button
                variant="cream"
                size="sm"
                onClick={() => setIsEditing(true)}
                icon={<Edit3 className="w-3.5 h-3.5 text-[#287A52]" />}
              >
                Edit Jawaban
              </Button>
            )}
          </div>
        </div>

        {/* Success toast alert */}
        {saveSuccessMessage && (
          <div className="p-3.5 rounded-2xl bg-[#DCEEDB] border border-[#287A52]/30 text-[#155C3B] text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-[#FFC93C]" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Question 1 */}
          <div className="space-y-2.5">
            <label className="block text-sm sm:text-base font-bold text-[#155C3B] flex items-start gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#DCEEDB] text-[#155C3B] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <span>Kebiasaan belajar apa yang selama ini paling sering kamu lakukan?</span>
            </label>
            <p className="text-xs text-[#20352B]/70 pl-8">
              Contoh: Apakah kamu memiliki jadwal belajar, belajar hanya ketika ada ulangan, atau sering menunda tugas?
            </p>
            <div className="pl-8">
              <textarea
                rows={3}
                required
                disabled={!isEditing}
                value={reflection.q1}
                onChange={(e) => setReflection({ ...reflection, q1: e.target.value })}
                placeholder="Tuliskan pengalaman kebiasaan belajarmu di sini..."
                className="w-full px-4 py-3 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/40 text-xs sm:text-sm leading-relaxed disabled:opacity-80 font-medium"
              />
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-2.5">
            <label className="block text-sm sm:text-base font-bold text-[#155C3B] flex items-start gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#DCEEDB] text-[#155C3B] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <span>Apa hal baru yang paling membuka pikiranmu dari materi bimbingan ini?</span>
            </label>
            <p className="text-xs text-[#20352B]/70 pl-8">
              Contoh: Mengenal active recall, cara memulai tugas dari bagian kecil, atau pentingnya belajar secara rutin.
            </p>
            <div className="pl-8">
              <textarea
                rows={3}
                required
                disabled={!isEditing}
                value={reflection.q2}
                onChange={(e) => setReflection({ ...reflection, q2: e.target.value })}
                placeholder="Tuliskan wawasan atau ilmu baru yang kamu temukan di sini..."
                className="w-full px-4 py-3 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/40 text-xs sm:text-sm leading-relaxed disabled:opacity-80 font-medium"
              />
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-2.5">
            <label className="block text-sm sm:text-base font-bold text-[#155C3B] flex items-start gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#DCEEDB] text-[#155C3B] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <span>Kebiasaan apa yang ingin kamu ubah dan mulai terapkan hari ini?</span>
            </label>
            <p className="text-xs text-[#20352B]/70 pl-8">
              Contoh: Membuat jadwal belajar, mengurangi gangguan HP, atau mencoba mengingat kembali materi tanpa melihat catatan.
            </p>
            <div className="pl-8">
              <textarea
                rows={3}
                required
                disabled={!isEditing}
                value={reflection.q3}
                onChange={(e) => setReflection({ ...reflection, q3: e.target.value })}
                placeholder="Tuliskan tekad perubahanmu secara spesifik di sini..."
                className="w-full px-4 py-3 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/40 text-xs sm:text-sm leading-relaxed disabled:opacity-80 font-medium"
              />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-[#287A52]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {isEditing ? (
                <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                  Simpan Jawaban Refleksi
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="cream"
                  size="md"
                  onClick={() => setIsEditing(true)}
                  icon={<Edit3 className="w-4 h-4" />}
                >
                  Ubah Jawaban Refleksi
                </Button>
              )}
            </div>

            <Link to="/kesimpulan">
              <Button
                variant="secondary"
                size="md"
                icon={<Award className="w-4 h-4" />}
                iconPosition="right"
              >
                Lihat Kesimpulan Akhir
              </Button>
            </Link>
          </div>
        </form>
      </Card>

    </div>
  );
};

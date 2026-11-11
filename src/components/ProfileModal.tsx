import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { storageService, StudentProfile } from '../services/storage';
import { User, School, BookOpen, Check, X } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (profile: StudentProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onUpdated }) => {
  const [profile, setProfile] = useState<StudentProfile>(storageService.getProfile());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onUpdated(profile);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md">
        <Card variant="white" padding="lg" rounded="3xl" className="relative shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[#20352B]/60 hover:text-[#155C3B] hover:bg-[#DCEEDB]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#DCEEDB] flex items-center justify-center text-[#155C3B] border-2 border-[#287A52]/30">
              <User className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#155C3B]">Data Peserta Didik</h3>
            <p className="text-xs text-[#20352B]/70 mt-1">
              Data ini akan dicantumkan pada LKPD, Study Plan, dan lembar hasil belajarmu.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#155C3B] mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#287A52]" />
                Nama Lengkap Siswa
              </label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Contoh: Rian Pratama"
                className="w-full px-4 py-2.5 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/50 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#155C3B] mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#287A52]" />
                Kelas / Tingkat
              </label>
              <input
                type="text"
                required
                value={profile.grade}
                onChange={(e) => setProfile({ ...profile, grade: e.target.value })}
                placeholder="Contoh: Kelas X / SMK"
                className="w-full px-4 py-2.5 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/50 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#155C3B] mb-1.5 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-[#287A52]" />
                Nama Sekolah
              </label>
              <input
                type="text"
                required
                value={profile.school}
                onChange={(e) => setProfile({ ...profile, school: e.target.value })}
                placeholder="Contoh: SMP Negeri 1 Jakarta"
                className="w-full px-4 py-2.5 rounded-2xl border border-[#287A52]/20 focus:outline-none focus:ring-2 focus:ring-[#287A52] bg-[#FFF9EB]/50 text-sm font-medium"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="md"
                icon={savedSuccess ? <Check className="w-4 h-4" /> : undefined}
              >
                {savedSuccess ? 'Tersimpan!' : 'Simpan Profil'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

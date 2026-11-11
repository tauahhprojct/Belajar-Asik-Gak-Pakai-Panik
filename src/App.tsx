import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProfileModal } from './components/ProfileModal';
import { Home } from './pages/Home';
import { Materi } from './pages/Materi';
import { DetailMateri } from './pages/DetailMateri';
import { LKPD } from './pages/LKPD';
import { Quiz } from './pages/Quiz';
import { QuizResult } from './pages/QuizResult';
import { Reflection } from './pages/Reflection';
import { Conclusion } from './pages/Conclusion';
import { storageService, StudentProfile } from './services/storage';

export default function App() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [, setProfile] = useState<StudentProfile>(storageService.getProfile());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleProfileUpdated = (newProfile: StudentProfile) => {
    setProfile(newProfile);
  };

  const handleResetDemoData = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    storageService.resetAllData();
    setShowResetConfirm(false);
    window.location.href = '/';
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#F5F8F5] text-[#173A2B]">
        {/* Navigation Header */}
        <Navbar onOpenProfileModal={() => setIsProfileModalOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/materi" element={<Materi />} />
            <Route path="/materi/:slug" element={<DetailMateri />} />
            <Route path="/lkpd" element={<LKPD />} />
            <Route path="/study-plan" element={<LKPD />} />
            <Route path="/soal" element={<Quiz />} />
            <Route path="/soal/hasil" element={<QuizResult />} />
            <Route path="/refleksi" element={<Reflection />} />
            <Route path="/kesimpulan" element={<Conclusion />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer onResetData={handleResetDemoData} />

        {/* Profile Editing Modal */}
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onUpdated={handleProfileUpdated}
        />

        {/* Demo Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-2xl border border-rose-200 space-y-4 text-center">
              <h3 className="font-display font-bold text-lg text-rose-600">
                Reset Semua Data Belajar?
              </h3>
              <p className="text-xs text-[#20352B]/80 leading-relaxed">
                Tindakan ini akan mengosongkan seluruh riwayat LKPD, Study Plan, kuis, dan refleksi di perangkat ini.
              </p>
              <div className="flex gap-2 justify-center pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-[#20352B] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={confirmReset}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                >
                  Ya, Reset Sekarang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

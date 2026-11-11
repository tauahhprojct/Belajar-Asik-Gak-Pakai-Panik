import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, ClipboardCheck, HelpCircle, Heart, Award, Home, User, Sparkles } from 'lucide-react';
import { GraduationLogo } from './StudentIllustrations';
import { storageService, StudentProfile } from '../services/storage';

interface NavbarProps {
  onOpenProfileModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProfileModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const profile: StudentProfile = storageService.getProfile();

  const navLinks = [
    { name: 'Beranda', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Materi', path: '/materi', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'LKPD', path: '/lkpd', icon: <ClipboardCheck className="w-4 h-4" /> },
    { name: 'Soal & Kuis', path: '/soal', icon: <HelpCircle className="w-4 h-4" /> },
    { name: 'Refleksi', path: '/refleksi', icon: <Heart className="w-4 h-4" /> },
    { name: 'Kesimpulan', path: '/kesimpulan', icon: <Award className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F8F5]/90 backdrop-blur-xl border-b border-[#173A2B]/[0.07] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.5rem] sm:h-20">
          
          {/* Brand Logo & Title */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group transition-transform active:scale-[0.98]"
          >
            <GraduationLogo size={42} className="group-hover:rotate-6 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-[#56816A] flex items-center gap-1">
                <Sparkles className="w-3 h-3 inline text-[#FFC93C]" />
                Layanan Informasi BK
              </span>
              <span className="font-display font-bold text-base sm:text-lg lg:text-xl text-[#173A2B] tracking-tight leading-tight">
                Belajar Asik, Gak Pakai Panik!
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/75 border border-[#173A2B]/[0.06] p-1 shadow-sm">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-[#155C3B] text-white shadow-sm'
                      : 'text-[#587064] hover:text-[#155C3B] hover:bg-[#E9F2EA]'
                  }`}
                >
                  <span className={active ? 'text-white' : 'text-[#287A52]'}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Student Badge / Profile Quick Access & Mobile Toggle */}
          <div className="flex items-center gap-2">
            {onOpenProfileModal && (
              <button
                onClick={onOpenProfileModal}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#155C3B] border border-[#173A2B]/10 hover:border-[#287A52]/30 hover:bg-[#E9F2EA] transition-all text-xs font-semibold"
                title="Atur Profil Siswa"
              >
                <div className="w-6 h-6 rounded-full bg-[#155C3B] text-white flex items-center justify-center font-bold text-xs">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{profile.name}</span>
              </button>
            )}

            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white text-[#155C3B] border border-[#173A2B]/10 shadow-sm hover:bg-[#E9F2EA] transition-all"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F8F5] border-b border-[#173A2B]/10 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          {/* Quick profile info for mobile */}
          {onOpenProfileModal && (
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfileModal();
              }}
              className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#173A2B]/10 mb-3 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#155C3B] text-white flex items-center justify-center font-bold text-sm">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#155C3B]">{profile.name}</p>
                  <p className="text-[11px] text-[#20352B]/70">{profile.grade || 'Siswa Berprestasi'}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#287A52] underline">Ubah Profil</span>
            </div>
          )}

          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  active
                    ? 'bg-[#155C3B] text-white shadow-sm'
                    : 'text-[#587064] hover:bg-[#E9F2EA]'
                }`}
              >
                <span className={active ? 'text-white' : 'text-[#287A52]'}>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

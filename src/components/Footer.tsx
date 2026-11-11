import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationLogo } from './StudentIllustrations';
import { Sparkles, Heart, Database, RefreshCw } from 'lucide-react';
import { isSupabaseConfigured } from '../services/supabase';
import { MATERI_DATA } from '../data/materi';

interface FooterProps {
  onResetData?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetData }) => {
  return (
    <footer className="no-print mt-16 bg-[#155C3B] text-white pt-12 pb-8 border-t-4 border-[#287A52]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/15">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <GraduationLogo size={40} className="bg-white/10 text-[#FFC93C]" />
              <div>
                <span className="text-xs uppercase tracking-widest text-[#DCEEDB] font-bold block">
                  Media Edukasi Siswa
                </span>
                <span className="font-display font-bold text-xl text-white">
                  Belajar Asik, Gak Pakai Panik!
                </span>
              </div>
            </div>
            <p className="text-sm text-[#DCEEDB]/90 leading-relaxed max-w-md">
              Media Layanan Informasi Bimbingan dan Konseling (BK) interaktif yang dirancang khusus untuk mendampingi siswa membangun kebiasaan belajar efektif, bebas dari kepanikan ujian, dan siap menjadi pribadi berprestasi berkarakter.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-[#DCEEDB]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC93C]" />
              <span>Guru Pembimbing: Tim Layanan Bimbingan & Konseling (BK)</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-display font-bold text-base text-[#FFC93C] mb-3">Menu Pembelajaran</h4>
            <ul className="space-y-2 text-sm text-[#DCEEDB]">
              <li>
                <Link to="/materi" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span>•</span> {MATERI_DATA.length} Modul Materi Belajar
                </Link>
              </li>
              <li>
                <Link to="/lkpd" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span>•</span> LKPD Interaktif
                </Link>
              </li>
              <li>
                <Link to="/soal" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span>•</span> Kuis & Uji Pemahaman
                </Link>
              </li>
              <li>
                <Link to="/refleksi" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span>•</span> Refleksi Diri
                </Link>
              </li>
              <li>
                <Link to="/kesimpulan" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span>•</span> Kesimpulan & Motivasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Status & Storage */}
          <div>
            <h4 className="font-display font-bold text-base text-[#FFC93C] mb-3">Penyimpanan Data</h4>
            <div className="space-y-3 text-xs text-[#DCEEDB]/90">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10">
                <Database className="w-4 h-4 text-[#FFC93C] shrink-0" />
                <div>
                  <p className="font-semibold text-white">
                    {isSupabaseConfigured ? 'Mode Database Cloud (Supabase)' : 'Mode Demo (LocalStorage)'}
                  </p>
                  <p className="text-[11px] text-[#DCEEDB]/80">
                    {isSupabaseConfigured
                      ? 'Tersinkronisasi dengan akun Cloud'
                      : 'Data tersimpan otomatis di browser perangkatmu'}
                  </p>
                </div>
              </div>

              {onResetData && (
                <button
                  onClick={onResetData}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-[#DCEEDB] hover:text-white border border-white/20 transition-all text-xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Data Belajar (Demo)</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#DCEEDB]/70 gap-2">
          <p>© {new Date().getFullYear()} Belajar Asik, Gak Pakai Panik! • Layanan Informasi BK</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> untuk seluruh siswa Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

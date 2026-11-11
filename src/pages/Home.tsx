import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { StudentHeroIllustration, GraduationLogo } from '../components/StudentIllustrations';
import { storageService } from '../services/storage';
import { MATERI_DATA } from '../data/materi';
import {
  BookOpen,
  ClipboardCheck,
  HelpCircle,
  Heart,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  ShieldCheck,
  Smile,
} from 'lucide-react';

export const Home: React.FC = () => {
  const completedMateri = storageService.getCompletedMateri();
  const quizResult = storageService.getQuizResult();
  const reflection = storageService.getReflection();

  const mainMenus = [
    {
      title: 'Materi Belajar',
      number: '01',
      desc: 'Modul panduan mengenali dan memperbaiki kebiasaan belajar agar lebih teratur, fokus, dan mandiri.',
      icon: <BookOpen className="w-8 h-8 text-[#155C3B]" />,
      path: '/materi',
      badge: `${completedMateri.length}/${MATERI_DATA.length} Selesai`,
      accentBg: 'bg-[#DCEEDB]/70',
      tagColor: 'bg-[#287A52] text-white',
    },
    {
      title: 'LKPD Interaktif',
      number: '02',
      desc: 'Aktivitas kenali diri, evaluasi kebiasaan belajar, dan susun My Study Plan pribadi.',
      icon: <ClipboardCheck className="w-8 h-8 text-[#287A52]" />,
      path: '/lkpd',
      badge: '3 Aktivitas Siswa',
      accentBg: 'bg-[#FFF9EB]',
      tagColor: 'bg-[#E07A5F] text-white',
    },
    {
      title: 'Soal & Kuis',
      number: '03',
      desc: 'Uji pemahamanmu lewat 5 kuis interaktif dengan pembahasan lengkap dan skor instan.',
      icon: <HelpCircle className="w-8 h-8 text-[#155C3B]" />,
      path: '/soal',
      badge: quizResult ? `Nilai: ${quizResult.score}` : 'Mulai Kuis',
      accentBg: 'bg-[#DCEEDB]/50',
      tagColor: 'bg-[#155C3B] text-white',
    },
    {
      title: 'Refleksi Diri',
      number: '04',
      desc: 'Tuangkan evaluasi jujur dan komitmen perubahan kebiasaan belajarmu mulai hari ini.',
      icon: <Heart className="w-8 h-8 text-[#E24E42]" />,
      path: '/refleksi',
      badge: reflection.isSaved ? 'Tersimpan ✓' : 'Belum Diisi',
      accentBg: 'bg-rose-50',
      tagColor: 'bg-[#287A52] text-white',
    },
  ];

  return (
    <div className="space-y-14 sm:space-y-20 pb-16">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#103D2A] via-[#155C3B] to-[#287A52] shadow-[0_28px_70px_-35px_rgba(21,92,59,0.65)]">
            <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border-[1px] border-white/10" />
            <div className="pointer-events-none absolute -right-4 -top-16 h-56 w-56 rounded-full border-[1px] border-white/10" />
            <div className="grid grid-cols-1 min-[560px]:grid-cols-12 gap-6 md:gap-8 items-center px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            
            {/* Left Column: Heading & Value Prop */}
            <div className="relative z-10 min-[560px]:col-span-7 space-y-5 sm:space-y-6 text-center min-[560px]:text-left">
              
              {/* Badge Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#E4F2E6] text-xs sm:text-sm font-semibold shadow-sm backdrop-blur">
                <GraduationLogo size={22} className="p-0.5 rounded-lg" />
                <span>Layanan Informasi BK • Bimbingan & Konseling</span>
                <Sparkles className="w-4 h-4 text-[#FFC93C]" />
              </div>

              {/* Main Title */}
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-[1.08] tracking-tight">
                Belajar Asik, <br className="hidden sm:inline" />
                <span className="text-[#FFD36B]">
                  Gak Pakai Panik!
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl mx-auto min-[560px]:mx-0 font-normal">
                Selamat datang di media belajar interaktif untuk membangun kebiasaan belajar yang lebih baik. Kenali cara mengatur waktu, meningkatkan konsentrasi, mengingat pelajaran, dan belajar mandiri.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row items-center justify-center min-[560px]:justify-start gap-3.5 pt-2">
                <Link to="/materi" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="primary"
                    fullWidth
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                    className="!bg-[#FFD36B] !text-[#173A2B] !shadow-none hover:!bg-[#FFE09A]"
                  >
                    Mulai Belajar Sekarang
                  </Button>
                </Link>
                <Link to="/lkpd" className="w-full sm:w-auto">
                  <Button size="lg" variant="cream" fullWidth icon={<ClipboardCheck className="w-5 h-5 text-white" />} className="!bg-white/10 !text-white !border-white/25 hover:!bg-white/20">
                    Buka Lembar LKPD
                  </Button>
                </Link>
              </div>

            </div>

            {/* Right Column: Cartoon Illustration */}
            <div className="relative min-[560px]:col-span-5 flex justify-center items-center">
              <div className="w-full max-w-sm md:max-w-none rounded-[1.5rem] bg-[#F0F6E9] p-2.5 sm:p-4 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.4)] transform hover:scale-[1.02] transition-transform duration-300">
                <StudentHeroIllustration className="w-full drop-shadow-md" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-10">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 rounded-2xl border border-[#173A2B]/[0.06] bg-white px-3 py-4 sm:px-7 sm:py-5 shadow-[0_18px_42px_-26px_rgba(21,92,59,0.3)]">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-center sm:text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F2E9]">
              <Clock className="w-4 h-4 text-[#287A52]" />
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-[#355B47]">Belajar Rutin</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-center sm:text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8F1DB]">
              <ShieldCheck className="w-4 h-4 text-[#9A7624]" />
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-[#355B47]">Anti Nyontek</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-center sm:text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FBEDEA]">
              <Smile className="w-4 h-4 text-[#C56A58]" />
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-[#355B47]">Mental Juara</span>
          </div>
        </div>
      </section>

      {/* 4 Main Menus Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.16em] text-[#56816A]">
            <span className="w-6 h-px bg-[#8FB49A]" />
            Eksplorasi Pembelajaran
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#173A2B] mt-2">
            Empat Menu Utama Belajar
          </h2>
          <p className="text-sm text-[#587064] mt-2 max-w-xl">
            Pilih langkah belajarmu secara bertahap atau langsung ke bagian yang ingin kamu selesaikan hari ini.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {mainMenus.map((menu) => (
            <Link key={menu.title} to={menu.path} className="group block focus:outline-none">
              <Card
                variant="white"
                padding="md"
                rounded="3xl"
                hoverEffect
                className="h-full flex flex-col justify-between border border-[#173A2B]/[0.06] group-hover:border-[#287A52]/25 relative overflow-hidden"
              >
                {/* Top Number & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-bold text-2xl text-[#173A2B]/20 group-hover:text-[#287A52]/40 transition-colors">
                    {menu.number}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${menu.tagColor}`}>
                    {menu.badge}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="space-y-3 mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${menu.accentBg} flex items-center justify-center p-3 group-hover:-rotate-3 group-hover:scale-105 transition-transform`}>
                    {menu.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#173A2B] group-hover:text-[#287A52] transition-colors">
                    {menu.title}
                  </h3>
                  <p className="text-xs text-[#587064] leading-relaxed">
                    {menu.desc}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="pt-3 border-t border-[#287A52]/10 flex items-center justify-between text-xs font-bold text-[#155C3B] group-hover:text-[#287A52]">
                  <span>Buka Menu</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Motivational Banner from Guru BK */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card
          variant="darkGreen"
          padding="lg"
          rounded="3xl"
          className="relative overflow-hidden border border-white/10 bg-gradient-to-r from-[#155C3B] to-[#287A52]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#E4F2E6]">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC93C]" />
                Pesan Hangat Guru BK
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                "Belajar itu seperti maraton, bukan lari cepat 100 meter!"
              </h3>
              <p className="text-sm text-white/75 max-w-xl">
                Tidak ada kata terlambat untuk memperbaiki cara belajarmu. Langkah kecil yang kamu lakukan hari ini—meski hanya 15 menit—adalah bibit kesuksesanmu di masa depan.
              </p>
            </div>

            <Link to="/kesimpulan" className="shrink-0">
              <Button variant="primary" size="md" icon={<Award className="w-4 h-4" />}>
                Lihat 3 Prinsip Sukses
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
};

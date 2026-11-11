import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SuccessCelebrationIllustration, GraduationLogo } from '../components/StudentIllustrations';
import { storageService, StudentProfile } from '../services/storage';
import {
  Sparkles,
  ArrowRight,
  Home,
  CheckCircle2,
  Heart,
  Share2,
  RotateCcw,
  BookOpen,
  Award,
} from 'lucide-react';

export const Conclusion: React.FC = () => {
  const profile: StudentProfile = storageService.getProfile();
  const completedMateri = storageService.getCompletedMateri();
  const quizResult = storageService.getQuizResult();

  const threeCoreRules = [
    {
      num: '01',
      title: 'Buat Target Kecil',
      desc: 'Jangan langsung menargetkan belajar banyak. Mulailah dari satu materi atau satu tugas.',
      color: 'bg-[#155C3B] text-white',
    },
    {
      num: '02',
      title: 'Atur Jadwal dan Tempat',
      desc: 'Tentukan waktu belajar yang realistis dan siapkan tempat yang nyaman serta mendukung konsentrasi.',
      color: 'bg-[#287A52] text-white',
    },
    {
      num: '03',
      title: 'Gunakan Strategi dan Evaluasi',
      desc: 'Coba rangkuman, peta konsep, latihan soal, dan active recall. Perhatikan perkembanganmu lalu perbaiki hal yang masih sulit.',
      color: 'bg-[#E07A5F] text-white',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      
      {/* Top Banner Celebration */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCEEDB] text-[#155C3B] text-xs font-bold border border-[#287A52]/20 shadow-xs">
          <GraduationLogo size={22} className="p-0.5 rounded-lg" />
          <span>Layanan Informasi BK • Bimbingan & Konseling</span>
          <Sparkles className="w-3.5 h-3.5 text-[#FFC93C]" />
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#155C3B]">
          Selamat, Kamu Telah Menyelesaikan Pembelajaran!
        </h1>

        <p className="text-sm sm:text-base text-[#20352B]/80 max-w-xl mx-auto leading-relaxed">
          Hebat sekali, <strong>{profile.name}</strong>! Kamu telah mengambil langkah besar untuk bertransformasi menjadi siswa yang cerdas, teratur, mandiri, dan berkarakter unggul.
        </p>

        {/* Mascot / Student celebration illustration */}
        <div className="py-4 flex justify-center">
          <SuccessCelebrationIllustration className="w-full max-w-sm drop-shadow-md" />
        </div>
      </div>

      {/* Rangkuman Kesimpulan Pembelajaran */}
      <Card variant="white" padding="xl" rounded="3xl" className="space-y-4 border-2 border-[#287A52]/20 shadow-sm">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-[#155C3B]" />
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#155C3B]">
            Intisari Kesimpulan Pembelajaran
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-[#20352B]/85 leading-relaxed">
          <p>
            Belajar merupakan proses yang membutuhkan kebiasaan, kedisiplinan, dan usaha berkelanjutan. Kamu tidak harus selalu mendapatkan nilai sempurna; hal terpenting adalah memiliki kemauan untuk terus belajar dan memperbaiki diri.
          </p>
          <p>
            Kenali kebiasaan yang ingin diperbaiki, buat jadwal belajar, kurangi gangguan HP, pilih strategi belajar yang tepat, dan biasakan mengulang materi. Perubahan dapat dimulai dari tindakan kecil yang kamu lakukan hari ini.
          </p>
        </div>
      </Card>

      {/* Bagian Wajib: Ingat 3 Hal Ini! */}
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#287A52]">
            Kunci Sukses Abadi
          </span>
          <h3 className="font-display font-bold text-2xl text-[#155C3B] mt-1">
            Ingat 3 Hal Ini!
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {threeCoreRules.map((rule) => (
            <Card
              key={rule.num}
              variant="cream"
              padding="lg"
              rounded="3xl"
              className="border-2 border-[#287A52]/20 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-display font-extrabold text-sm ${rule.color}`}>
                  {rule.num}
                </span>
                <h4 className="font-display font-bold text-lg text-[#155C3B]">
                  {rule.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#20352B]/80 leading-relaxed">
                  {rule.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#287A52]/10 flex items-center gap-1.5 text-[11px] font-bold text-[#287A52]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Prinsip Siswa Juara</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pesan Motivasi dari Guru BK */}
      <Card variant="darkGreen" padding="xl" rounded="3xl" className="space-y-4 text-center sm:text-left relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-[#FFC93C] shrink-0 border border-white/20">
            <Heart className="w-10 h-10 fill-current" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-[#FFC93C]">
              Pesan Hangat Dari Guru BK
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              "Kami Bangga Padamu!"
            </h3>
            <p className="text-xs sm:text-sm text-[#DCEEDB] leading-relaxed">
              Ingatlah bahwa setiap siswa berkembang dengan kecepatan dan keunikannya masing-masing. Jangan bandingkan permulaanmu dengan puncak kesuksesan orang lain. Tetaplah percaya diri, jaga kesehatan mentalmu, dan nikmati setiap proses belajarmu. Pintu ruang BK akan selalu terbuka hangat menyambut cerita dan impianmu!
            </p>
          </div>
        </div>
      </Card>

      {/* Bottom Navigation Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/" className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            icon={<Home className="w-5 h-5" />}
          >
            Kembali ke Beranda
          </Button>
        </Link>

        <Link to="/lkpd" className="w-full sm:w-auto">
          <Button
            variant="cream"
            size="lg"
            fullWidth
            icon={<BookOpen className="w-5 h-5 text-[#287A52]" />}
          >
            Cek Lembar LKPD & Study Plan
          </Button>
        </Link>
      </div>

    </div>
  );
};

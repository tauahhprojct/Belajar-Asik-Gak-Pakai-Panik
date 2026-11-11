import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MATERI_DATA, MateriItem } from '../data/materi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { storageService } from '../services/storage';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  BookOpen,
  Check,
  Share2,
  Lightbulb,
  HeartHandshake,
  CheckCheck,
} from 'lucide-react';

export const DetailMateri: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const currentIndex = MATERI_DATA.findIndex((m) => m.slug === slug);
  const materi: MateriItem | undefined = MATERI_DATA[currentIndex];

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (materi) {
      window.scrollTo(0, 0);
      setIsCompleted(storageService.isMateriCompleted(materi.id));
    }
  }, [slug, materi]);

  if (!materi) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <Card variant="white" padding="xl" rounded="3xl">
          <h2 className="font-display font-bold text-2xl text-[#155C3B] mb-2">Materi Tidak Ditemukan</h2>
          <p className="text-sm text-[#20352B]/70 mb-6">Materi yang kamu cari mungkin telah dipindahkan atau belum tersedia.</p>
          <Link to="/materi">
            <Button variant="primary">Kembali ke Daftar Materi</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const prevMateri = currentIndex > 0 ? MATERI_DATA[currentIndex - 1] : null;
  const nextMateri = currentIndex < MATERI_DATA.length - 1 ? MATERI_DATA[currentIndex + 1] : null;

  const handleToggleComplete = () => {
    const updatedList = storageService.toggleMateriCompleted(materi.id);
    setIsCompleted(updatedList.includes(materi.id));
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link to="/materi">
          <Button variant="cream" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
            Semua Materi
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyShare}
            className="p-2 rounded-xl border border-[#287A52]/20 text-[#155C3B] bg-white hover:bg-[#DCEEDB]/50 transition-colors text-xs flex items-center gap-1.5 font-medium"
            title="Salin Tautan Materi"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{copiedLink ? 'Disalin!' : 'Bagikan'}</span>
          </button>

          <Button
            variant={isCompleted ? 'light' : 'primary'}
            size="sm"
            onClick={handleToggleComplete}
            icon={isCompleted ? <Check className="w-4 h-4 text-[#287A52]" /> : <CheckCircle className="w-4 h-4" />}
          >
            {isCompleted ? 'Selesai Dibaca ✓' : 'Tandai Selesai'}
          </Button>
        </div>
      </div>

      {/* Hero Header Card */}
      <Card variant="lightGreen" padding="xl" rounded="3xl" className="border-2 border-[#287A52]/25 relative overflow-hidden">
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-bold text-xs uppercase px-3 py-1 rounded-full bg-[#155C3B] text-white">
              Modul {materi.id} dari {MATERI_DATA.length}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 text-[#155C3B] border border-[#287A52]/20">
              {materi.badge}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#20352B]/70 ml-auto">
              <Clock className="w-3.5 h-3.5" />
              {materi.estimatedMinutes} menit baca
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#155C3B] leading-tight">
            {materi.title}
          </h1>

          <p className="text-sm sm:text-base text-[#20352B]/90 font-medium leading-relaxed">
            {materi.tagline}
          </p>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/20 pointer-events-none" />
      </Card>

      {/* Main Content Card: Explanation */}
      <Card variant="white" padding="xl" rounded="3xl" className="space-y-6">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#155C3B] mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#287A52]" />
            {materi.explanation.heading}
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#20352B]/85 leading-relaxed">
            {materi.explanation.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Key Points Grid */}
        {materi.explanation.keyPoints && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#287A52]/10">
            {materi.explanation.keyPoints.map((kp, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FFF9EB] border border-[#287A52]/15 space-y-1.5">
                <div className="w-7 h-7 rounded-xl bg-[#287A52] text-white flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <h4 className="font-display font-bold text-sm text-[#155C3B]">{kp.title}</h4>
                <p className="text-xs text-[#20352B]/80 leading-relaxed">{kp.desc}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Daily Example Section */}
      <Card variant="cream" padding="lg" rounded="3xl" className="border-2 border-[#287A52]/20 space-y-4">
        <div className="flex items-center gap-2 text-[#155C3B]">
          <HeartHandshake className="w-5 h-5 text-[#287A52]" />
          <h3 className="font-display font-bold text-lg sm:text-xl">
            Contoh Penerapan dalam Kehidupan Sehari-hari
          </h3>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white border border-[#287A52]/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#287A52] block mb-1">
              Situasi Nyata Siswa
            </span>
            <p className="text-xs sm:text-sm text-[#20352B]/90 italic">
              "{materi.dailyExample.situation}"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#DCEEDB]/60 border border-[#287A52]/15">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#155C3B] block mb-1">
              Ulasan & Analisis Guru BK
            </span>
            <p className="text-xs sm:text-sm text-[#20352B]/90 font-medium">
              {materi.dailyExample.analysis}
            </p>
          </div>
        </div>
      </Card>

      {/* Benefits Section */}
      <Card variant="white" padding="lg" rounded="3xl" className="space-y-4">
        <div className="flex items-center gap-2 text-[#155C3B]">
          <Sparkles className="w-5 h-5 text-[#FFC93C]" />
          <h3 className="font-display font-bold text-lg sm:text-xl">
            Manfaat Positif yang Akan Kamu Dapatkan
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {materi.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#DCEEDB]/40 border border-[#287A52]/10">
              <CheckCheck className="w-4 h-4 text-[#287A52] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-[#20352B]/90 font-medium">{b}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Practical Tips Section */}
      <Card variant="white" padding="lg" rounded="3xl" className="space-y-4">
        <div className="flex items-center gap-2 text-[#155C3B]">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="font-display font-bold text-lg sm:text-xl">
            Tips Praktis Langsung Praktik!
          </h3>
        </div>

        <div className="space-y-3">
          {materi.practicalTips.map((tipItem, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#FFF9EB] border border-[#287A52]/20 flex flex-col sm:flex-row gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-[#155C3B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                Tip {i + 1}
              </div>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-[#155C3B]">
                  {tipItem.tip}
                </h4>
                <p className="text-xs sm:text-sm text-[#20352B]/80 mt-1 leading-relaxed">
                  {tipItem.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Motivational Quote */}
      <div className="p-5 rounded-3xl bg-[#155C3B] text-white text-center shadow-md">
        <p className="font-display font-medium text-sm sm:text-base italic leading-relaxed text-[#DCEEDB]">
          "{materi.quote}"
        </p>
      </div>

      {/* Bottom Nav: Prev / Mark Completed / Next */}
      <div className="pt-4 border-t border-[#287A52]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevMateri ? (
          <Link to={`/materi/${prevMateri.slug}`} className="w-full sm:w-auto">
            <Button variant="outline" size="md" fullWidth icon={<ArrowLeft className="w-4 h-4" />}>
              Materi Sebelumnya
            </Button>
          </Link>
        ) : (
          <Link to="/materi" className="w-full sm:w-auto">
            <Button variant="cream" size="md" fullWidth icon={<ArrowLeft className="w-4 h-4" />}>
              Daftar Materi
            </Button>
          </Link>
        )}

        <Button
          variant={isCompleted ? 'light' : 'primary'}
          size="md"
          onClick={handleToggleComplete}
          icon={isCompleted ? <Check className="w-4 h-4 text-[#287A52]" /> : <CheckCircle className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          {isCompleted ? 'Telah Selesai Dipelajari' : 'Tandai Selesai Materi Ini'}
        </Button>

        {nextMateri ? (
          <Link to={`/materi/${nextMateri.slug}`} className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              fullWidth
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Materi Berikutnya
            </Button>
          </Link>
        ) : (
          <Link to="/lkpd" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              fullWidth
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Lanjut ke LKPD
            </Button>
          </Link>
        )}
      </div>

    </div>
  );
};

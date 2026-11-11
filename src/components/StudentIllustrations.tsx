import React from 'react';

// Cheerful cartoon student illustrations matching the BK school educational theme
export const StudentHeroIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 460 360" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="heroBgGrad" x1="50" y1="20" x2="410" y2="340" gradientUnits="userSpaceOnUse">
        <stop stopColor="#DCEEDB" />
        <stop offset="1" stopColor="#E8F5E9" />
      </linearGradient>
      <linearGradient id="heroGlow" x1="230" y1="40" x2="230" y2="320" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2" />
      </linearGradient>
      <filter id="shadowSoft" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#155C3B" floodOpacity="0.12" />
      </filter>
    </defs>

    {/* Background Soft Bubble */}
    <ellipse cx="230" cy="200" rx="200" ry="140" fill="url(#heroBgGrad)" />
    <circle cx="230" cy="180" r="130" fill="url(#heroGlow)" />

    {/* Floating Decorative Elements: Stars & Lightbulbs & Clock */}
    {/* Little yellow star 1 */}
    <path d="M70 120 L74 132 L86 133 L76 141 L79 153 L70 145 L61 153 L64 141 L54 133 L66 132 Z" fill="#FFC93C" />
    {/* Little yellow star 2 */}
    <path d="M380 90 L383 99 L393 100 L385 106 L387 115 L380 109 L373 115 L375 106 L367 100 L377 99 Z" fill="#FFC93C" />
    
    {/* Floating Notebook / Clock icon left */}
    <g transform="translate(60, 200)">
      <circle cx="24" cy="24" r="22" fill="#FFFFFF" filter="url(#shadowSoft)" />
      <circle cx="24" cy="24" r="18" fill="#DCEEDB" />
      <path d="M24 14 V24 H30" stroke="#155C3B" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Floating Pencil right */}
    <g transform="translate(360, 190) rotate(25)">
      <rect x="0" y="0" width="14" height="42" rx="3" fill="#FFC93C" />
      <polygon points="0,42 14,42 7,54" fill="#E07A5F" />
      <rect x="0" y="0" width="14" height="10" rx="2" fill="#E2E8F0" />
    </g>

    {/* Student 1 (Girl with glasses, holding notebook with green cover and thumbs up) */}
    <g transform="translate(100, 100)">
      {/* Body / Uniform (White & Green) */}
      <path d="M35 150 C35 115, 85 115, 85 150 Z" fill="#FFFFFF" />
      <path d="M50 118 L55 138 L65 138 L70 118 Z" fill="#287A52" />
      <path d="M45 145 C45 130, 75 130, 75 145 Z" fill="#155C3B" />
      
      {/* Arms & Notebook */}
      <path d="M30 135 Q15 150 25 170" stroke="#F6D5B8" strokeWidth="12" strokeLinecap="round" />
      <rect x="18" y="145" width="30" height="40" rx="4" fill="#287A52" transform="rotate(-10 18 145)" />
      <rect x="22" y="149" width="22" height="32" rx="2" fill="#FFFFFF" transform="rotate(-10 22 149)" />
      
      {/* Neck */}
      <rect x="54" y="102" width="12" height="18" fill="#F6D5B8" rx="4" />
      
      {/* Head */}
      <ellipse cx="60" cy="80" rx="26" ry="28" fill="#F6D5B8" />
      {/* Hair (Black Bob with bangs) */}
      <path d="M34 76 C32 45, 88 45, 86 76 C86 95, 78 100, 78 100 C78 100, 74 88, 60 88 C46 88, 42 100, 42 100 C42 100, 34 95, 34 76 Z" fill="#20352B" />
      {/* Cheerful Face */}
      {/* Glasses */}
      <rect x="42" y="70" width="15" height="12" rx="4" fill="none" stroke="#155C3B" strokeWidth="2.5" />
      <rect x="63" y="70" width="15" height="12" rx="4" fill="none" stroke="#155C3B" strokeWidth="2.5" />
      <line x1="57" y1="76" x2="63" y2="76" stroke="#155C3B" strokeWidth="2.5" />
      {/* Eyes behind glasses */}
      <circle cx="50" cy="76" r="2.5" fill="#20352B" />
      <circle cx="70" cy="76" r="2.5" fill="#20352B" />
      {/* Cheeks */}
      <circle cx="43" cy="85" r="4" fill="#FF8A8A" opacity="0.6" />
      <circle cx="77" cy="85" r="4" fill="#FF8A8A" opacity="0.6" />
      {/* Big Smile */}
      <path d="M54 87 Q60 94 66 87" stroke="#20352B" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Student 2 (Boy Center, holding graduation cap / pointing up with enthusiasm) */}
    <g transform="translate(195, 65)">
      {/* Body / School Uniform */}
      <path d="M30 185 C30 145, 90 145, 90 185 Z" fill="#287A52" />
      {/* Collar */}
      <polygon points="50,146 60,165 70,146" fill="#FFFFFF" />
      <polygon points="56,155 60,185 64,155" fill="#155C3B" />

      {/* Right Arm waving high */}
      <path d="M85 155 Q105 130 100 105" stroke="#F6D5B8" strokeWidth="14" strokeLinecap="round" />
      {/* Hand holding mini flag or thumb up */}
      <circle cx="100" cy="100" r="8" fill="#F6D5B8" />
      
      {/* Left Arm holding books */}
      <path d="M35 155 Q18 170 30 190" stroke="#F6D5B8" strokeWidth="14" strokeLinecap="round" />
      
      {/* Head */}
      <rect x="54" y="130" width="14" height="20" fill="#F6D5B8" rx="5" />
      <ellipse cx="61" cy="105" rx="28" ry="30" fill="#F6D5B8" />
      
      {/* Hair (Short neat brown/black) */}
      <path d="M33 100 C30 65, 92 65, 89 100 C89 100, 85 86, 75 84 C65 82, 55 85, 45 84 C38 88, 33 100, 33 100 Z" fill="#2D2321" />
      
      {/* Graduation Cap on boy */}
      <g transform="translate(26, 40)">
        <polygon points="35,0 72,12 35,24 -2,12" fill="#155C3B" />
        <rect x="23" y="16" width="24" height="12" fill="#0D3B25" rx="3" />
        {/* Tassel */}
        <line x1="35" y1="12" x2="68" y2="24" stroke="#FFC93C" strokeWidth="2" />
        <circle cx="68" cy="27" r="3" fill="#FFC93C" />
      </g>

      {/* Eyes (Joyful arches) */}
      <path d="M48 103 Q54 97 60 103" stroke="#20352B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M68 103 Q74 97 80 103" stroke="#20352B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="45" cy="110" r="5" fill="#FF8A8A" opacity="0.6" />
      <circle cx="83" cy="110" r="5" fill="#FF8A8A" opacity="0.6" />
      {/* Wide Laugh Smile */}
      <path d="M54 112 Q64 125 74 112 Z" fill="#E24E42" stroke="#20352B" strokeWidth="1.5" />
    </g>

    {/* Student 3 (Student Right with Backpack and thumbs up) */}
    <g transform="translate(300, 95)">
      {/* Backpack behind */}
      <rect x="70" y="130" width="24" height="40" rx="8" fill="#E07A5F" />

      {/* Body */}
      <path d="M30 160 C30 120, 80 120, 80 160 Z" fill="#FFFFFF" />
      <path d="M45 125 L55 145 L65 125 Z" fill="#FFC93C" />

      {/* Arm thumbs up */}
      <path d="M75 140 Q90 135 90 120" stroke="#ECC49F" strokeWidth="12" strokeLinecap="round" />
      <circle cx="90" cy="115" r="6" fill="#ECC49F" />

      {/* Head */}
      <rect x="49" y="108" width="12" height="18" fill="#ECC49F" rx="4" />
      <ellipse cx="55" cy="85" rx="25" ry="27" fill="#ECC49F" />
      {/* Hair (Ponytail style) */}
      <path d="M30 80 C30 50, 80 50, 80 80 C80 90, 75 92, 55 90 C35 90, 30 90, 30 80 Z" fill="#4A2E18" />
      <circle cx="82" cy="65" r="12" fill="#4A2E18" />
      
      {/* Eyes */}
      <circle cx="47" cy="82" r="3" fill="#20352B" />
      <circle cx="65" cy="82" r="3" fill="#20352B" />
      {/* Cheeks */}
      <circle cx="42" cy="90" r="4" fill="#FF8A8A" opacity="0.6" />
      <circle cx="70" cy="90" r="4" fill="#FF8A8A" opacity="0.6" />
      {/* Sweet Smile */}
      <path d="M51 92 Q56 97 61 92" stroke="#20352B" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Stack of colorful study books on grass bottom */}
    <g transform="translate(160, 260)">
      {/* Green base grass pill */}
      <rect x="-40" y="45" width="220" height="24" rx="12" fill="#DCEEDB" />
      
      {/* Book 1 (Blue bottom) */}
      <rect x="20" y="32" width="100" height="14" rx="3" fill="#3B82F6" />
      <rect x="22" y="34" width="94" height="10" rx="2" fill="#DBEAFE" />
      <line x1="28" y1="39" x2="110" y2="39" stroke="#93C5FD" strokeWidth="2" />

      {/* Book 2 (Yellow middle) */}
      <rect x="28" y="18" width="85" height="14" rx="3" fill="#F59E0B" />
      <rect x="30" y="20" width="80" height="10" rx="2" fill="#FEF3C7" />

      {/* Book 3 (Primary Green top) */}
      <rect x="35" y="5" width="70" height="14" rx="3" fill="#287A52" />
      <rect x="37" y="7" width="65" height="10" rx="2" fill="#DCEEDB" />

      {/* Apple on top of books */}
      <circle cx="70" cy="-2" r="7" fill="#E24E42" />
      <path d="M70 -6 Q74 -10 76 -7" stroke="#155C3B" strokeWidth="2" fill="none" />
      <path d="M72 -8 Q76 -9 74 -6 Z" fill="#287A52" />
    </g>
  </svg>
);

export const GraduationLogo: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 40,
}) => (
  <div
    className={`inline-flex items-center justify-center rounded-2xl bg-[#155C3B] text-[#FFC93C] shadow-md p-2 ${className}`}
    style={{ width: size, height: size }}
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" opacity="0.9" />
    </svg>
  </div>
);

export const SuccessCelebrationIllustration: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md mx-auto' }) => (
  <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="180" cy="130" r="110" fill="#DCEEDB" opacity="0.6" />
    <circle cx="180" cy="130" r="85" fill="#FFFFFF" />

    {/* Confetti particles */}
    <rect x="80" y="50" width="8" height="8" rx="2" fill="#FFC93C" transform="rotate(25 80 50)" />
    <circle cx="100" cy="90" r="5" fill="#287A52" />
    <rect x="270" y="60" width="8" height="8" rx="2" fill="#E07A5F" transform="rotate(45 270 60)" />
    <circle cx="255" cy="110" r="6" fill="#3B82F6" />
    <path d="M175 25 L180 35 L192 37 L183 45 L185 57 L175 50 L165 57 L167 45 L158 37 L170 35 Z" fill="#FFC93C" />

    {/* Cheerful Student Holding Trophy & Report Card */}
    <g transform="translate(130, 60)">
      {/* Body */}
      <path d="M25 130 C25 95, 75 95, 75 130 Z" fill="#287A52" />
      <polygon points="42,98 50,112 58,98" fill="#FFFFFF" />
      
      {/* Arms holding golden trophy */}
      <path d="M30 110 Q10 100 20 85" stroke="#F6D5B8" strokeWidth="10" strokeLinecap="round" />
      <path d="M70 110 Q90 100 80 85" stroke="#F6D5B8" strokeWidth="10" strokeLinecap="round" />

      {/* Head */}
      <rect x="44" y="80" width="12" height="18" fill="#F6D5B8" rx="4" />
      <ellipse cx="50" cy="60" rx="24" ry="26" fill="#F6D5B8" />
      {/* Hair */}
      <path d="M26 55 C24 25, 76 25, 74 55 C74 55, 70 42, 60 40 C50 38, 40 42, 26 55 Z" fill="#20352B" />
      {/* Mortarboard / Topi Wisuda */}
      <g transform="translate(18, 15)">
        <polygon points="32,0 64,10 32,20 0,10" fill="#155C3B" />
        <rect x="22" y="14" width="20" height="8" fill="#0D3B25" rx="2" />
        <line x1="32" y1="10" x2="60" y2="20" stroke="#FFC93C" strokeWidth="2" />
        <circle cx="60" cy="22" r="2.5" fill="#FFC93C" />
      </g>
      {/* Winking happy eyes */}
      <path d="M39 60 Q44 55 49 60" stroke="#20352B" strokeWidth="2" fill="none" />
      <circle cx="61" cy="59" r="2.5" fill="#20352B" />
      <circle cx="36" cy="65" r="4" fill="#FF8A8A" opacity="0.6" />
      <circle cx="64" cy="65" r="4" fill="#FF8A8A" opacity="0.6" />
      <path d="M44 68 Q50 76 56 68 Z" fill="#E24E42" stroke="#20352B" strokeWidth="1" />

      {/* Golden Trophy */}
      <g transform="translate(35, 75)">
        <path d="M8 8 H22 V20 C22 24, 8 24, 8 20 Z" fill="#FFC93C" />
        <path d="M5 11 Q1 11 1 15 Q1 18 5 18" stroke="#F59E0B" strokeWidth="2" fill="none" />
        <path d="M25 11 Q29 11 29 15 Q29 18 25 18" stroke="#F59E0B" strokeWidth="2" fill="none" />
        <rect x="13" y="20" width="4" height="6" fill="#F59E0B" />
        <rect x="8" y="26" width="14" height="4" rx="2" fill="#D97706" />
        {/* Star in Trophy */}
        <path d="M15 11 L16 14 L19 14 L17 16 L18 19 L15 17 L12 19 L13 16 L11 14 L14 14 Z" fill="#FFFFFF" />
      </g>
    </g>
  </svg>
);

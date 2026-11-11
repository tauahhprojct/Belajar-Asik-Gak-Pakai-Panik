import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  showText?: boolean;
  label?: string;
  className?: string;
  color?: 'primary' | 'dark' | 'amber';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showText = true,
  label,
  className = '',
  color = 'primary',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((current / (total || 1)) * 100)));

  const colorStyles = {
    primary: 'bg-[#287A52]',
    dark: 'bg-[#155C3B]',
    amber: 'bg-[#E07A5F]',
  };

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-1.5 text-[#20352B]/80">
          <span>{label || `Progres: ${current} dari ${total}`}</span>
          <span className="font-bold text-[#155C3B]">{percentage}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-[#DCEEDB]/70 rounded-full overflow-hidden p-0.5 border border-[#287A52]/20">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorStyles[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

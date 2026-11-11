import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'cream' | 'lightGreen' | 'darkGreen';
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'xl' | '2xl' | '3xl';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'white',
  hoverEffect = false,
  padding = 'lg',
  rounded = '3xl',
  className = '',
  ...props
}) => {
  const variantStyles = {
    white: 'bg-white text-[#173A2B] border border-[#173A2B]/[0.06] shadow-[0_12px_34px_-18px_rgba(21,92,59,0.22)]',
    cream: 'bg-[#FBFCF8] text-[#173A2B] border border-[#287A52]/12 shadow-[0_12px_34px_-18px_rgba(21,92,59,0.18)]',
    lightGreen: 'bg-[#E7F2E9] text-[#155C3B] border border-[#287A52]/15 shadow-[0_12px_34px_-18px_rgba(21,92,59,0.18)]',
    darkGreen: 'bg-[#155C3B] text-white shadow-[0_16px_40px_-18px_rgba(21,92,59,0.42)]',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10',
  };

  const roundedStyles = {
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  const hoverStyles = hoverEffect
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(21,92,59,0.26)] hover:border-[#287A52]/25 cursor-pointer'
    : '';

  return (
    <div
      className={`${variantStyles[variant]} ${paddingStyles[padding]} ${roundedStyles[rounded]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

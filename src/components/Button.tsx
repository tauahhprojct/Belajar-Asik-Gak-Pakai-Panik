import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'light' | 'outline' | 'cream' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6B83F]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2 shadow-sm hover:shadow-md',
    lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5 shadow-md hover:shadow-lg font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#155C3B] hover:bg-[#0E3D27] text-white shadow-[#155C3B]/20 active:translate-y-0.5',
    secondary:
      'bg-[#287A52] hover:bg-[#1E5D3E] text-white shadow-[#287A52]/20 active:translate-y-0.5',
    light:
      'bg-[#DCEEDB] hover:bg-[#CFE6CE] text-[#155C3B] font-semibold active:translate-y-0.5',
    cream:
      'bg-[#FFF9EB] hover:bg-[#F6E9CF] text-[#155C3B] border border-[#287A52]/30 active:translate-y-0.5',
    outline:
      'border-2 border-[#155C3B] text-[#155C3B] hover:bg-[#155C3B] hover:text-white active:translate-y-0.5',
    danger:
      'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20 active:translate-y-0.5',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

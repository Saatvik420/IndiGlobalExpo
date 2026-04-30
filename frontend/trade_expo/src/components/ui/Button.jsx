import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = 'font-bold uppercase tracking-widest transition-all duration-300 interactive cursor-pointer';
  
  const variants = {
    primary: 'bg-amber-600 text-white hover:bg-white hover:text-gray-900',
    secondary: 'border border-gray-600 text-white hover:border-white hover:bg-white/5',
    tertiary: 'bg-white text-gray-900 hover:bg-amber-600 hover:text-white',
    outline: 'border border-white/30 text-white hover:border-white'
  };
  
  const sizes = {
    sm: 'px-6 py-3 text-xs',
    md: 'px-8 py-4 text-sm',
    lg: 'px-10 py-5 text-sm'
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

import React from 'react'

interface GovButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export const GovButton: React.FC<GovButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-[15px] gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5'
  }

  const variantMap: Record<string, string> = {
    primary: 'btn-gov-primary',
    secondary: 'btn-gov-secondary',
    outline: 'btn-gov-outline',
    ghost: 'inline-flex items-center justify-center gap-2 text-slate-600 hover:bg-slate-50 hover:text-slate-800 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  }

  return (
    <button
      className={`${variantMap[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
}
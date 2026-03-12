import React from 'react'

interface GovInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

export const GovInput = React.forwardRef<HTMLInputElement, GovInputProps>(
  ({ label, error, helperText, icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5 group">
        <label className="label-premium">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              input-premium
              ${icon ? 'pl-12' : ''}
              ${error ? 'input-premium-error' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <div className="flex items-center gap-1.5 animate-fade-in">
            <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-red-500 text-[13px] font-medium">{error}</p>
          </div>
        )}
        {helperText && !error && (
          <p className="text-slate-400 text-[12px] pl-0.5">{helperText}</p>
        )}
      </div>
    )
  }
)

GovInput.displayName = 'GovInput'

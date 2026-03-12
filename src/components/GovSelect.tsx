import React from 'react'
import { ChevronDown } from 'lucide-react'

interface GovSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  helperText?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
  icon?: React.ReactNode
}

export const GovSelect: React.FC<GovSelectProps> = ({ 
  label, 
  error, 
  helperText, 
  options,
  placeholder = 'Seleccione una opcion',
  icon,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-1.5 group">
      <label className="label-premium">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200 pointer-events-none z-10">
            {icon}
          </div>
        )}
        <select
          className={`
            input-premium appearance-none cursor-pointer pr-12
            ${icon ? 'pl-12' : ''}
            ${error ? 'input-premium-error' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors duration-200">
          <ChevronDown className="w-4 h-4" />
        </div>
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
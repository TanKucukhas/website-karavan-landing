'use client';
import { useState } from 'react';
import { analytics } from '@/lib/analytics';

type Props = {
  leftLabel: string;
  rightLabel: string;
  defaultValue?: 'left' | 'right';
  onToggle?: (value: 'left' | 'right') => void;
  className?: string;
};

export default function ToggleSwitch({ 
  leftLabel, 
  rightLabel, 
  defaultValue = 'left',
  onToggle,
  className = ''
}: Props) {
  const [value, setValue] = useState<'left' | 'right'>(defaultValue);

  const handleToggle = (newValue: 'left' | 'right') => {
    setValue(newValue);
    onToggle?.(newValue);
    
    // Analytics tracking
    if (newValue === 'left') {
      analytics.roleChange('seller');
    } else {
      analytics.roleChange('buyer');
    }
  };

  return (
    <div className={`relative inline-flex rounded-xl bg-gray-100 p-1 w-full sm:w-auto ${className}`} role="tablist">
      {/* Background Slider */}
      <div 
        className={`absolute top-1 bottom-1 w-[calc(50%-2px)] bg-white rounded-lg shadow-sm ring-1 ring-gray-300 transition-transform duration-200 ease-in-out ${
          value === 'right' ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      
      {/* Left Option */}
      <button
        type="button"
        role="tab"
        aria-selected={value === 'left'}
        className={`relative z-10 px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex-1 ${
          value === 'left' 
            ? 'text-gray-900' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => handleToggle('left')}
      >
        {leftLabel}
      </button>
      
      {/* Right Option */}
      <button
        type="button"
        role="tab"
        aria-selected={value === 'right'}
        className={`relative z-10 px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex-1 ${
          value === 'right' 
            ? 'text-gray-900' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => handleToggle('right')}
      >
        {rightLabel}
      </button>
    </div>
  );
}

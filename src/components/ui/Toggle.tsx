import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  size = 'medium',
  className = '',
}) => {
  // Size mappings
  const sizes = {
    small: {
      toggle: 'w-8 h-4',
      circle: 'w-3 h-3',
      translateX: 'translate-x-4',
    },
    medium: {
      toggle: 'w-12 h-6',
      circle: 'w-4 h-4',
      translateX: 'translate-x-6',
    },
    large: {
      toggle: 'w-16 h-8',
      circle: 'w-6 h-6',
      translateX: 'translate-x-8',
    },
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      {label && (
        <span className="mr-2 text-sm font-medium">
          {label}
        </span>
      )}
      <button
        type="button"
        className={`${sizes[size].toggle} relative inline-flex items-center rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-calmi-orange ${
          enabled ? 'bg-calmi-orange' : 'bg-gray-200'
        }`}
        onClick={onChange}
      >
        <span
          className={`${
            enabled ? sizes[size].translateX : 'translate-x-0'
          } inline-block ${
            sizes[size].circle
          } transform rounded-full bg-white transition-transform`}
        />
      </button>
    </div>
  );
};

export interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkMode,
  onToggle,
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="mr-2 text-sm">
        {isDarkMode ? '🌙' : '☀️'}
      </span>
      <Toggle
        enabled={isDarkMode}
        onChange={onToggle}
        size="medium"
      />
    </div>
  );
};

export interface GenZToggleProps {
  isGenZMode: boolean;
  onToggle: () => void;
  className?: string;
}

export const GenZToggle: React.FC<GenZToggleProps> = ({
  isGenZMode,
  onToggle,
  className = '',
}) => {
  return (
    <Toggle
      enabled={isGenZMode}
      onChange={onToggle}
      label="gen z mode"
      size="medium"
      className={className}
    />
  );
};

export default Toggle;
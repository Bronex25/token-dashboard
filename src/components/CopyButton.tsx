import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

type Props = {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
};

export const CopyButton = ({
  text,
  className = '',
  size = 'md',
  variant = 'default',
}: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const variantClasses = {
    default:
      'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    outline:
      'border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800',
  };

  const baseClasses = `
    relative inline-flex items-center justify-center rounded-md p-2
    cursor-pointer transition-all duration-200 ease-in-out
    hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    dark:focus:ring-offset-gray-900
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim();

  return (
    <button
      className={baseClasses}
      onClick={handleCopy}
      aria-label={isCopied ? 'Copied to clipboard' : 'Copy to clipboard'}
      title={isCopied ? 'Copied!' : 'Copy'}
    >
      <div className="relative">
        {/* Copy Icon */}
        <Copy
          className={`
            ${sizeClasses[size]} transition-all duration-300 ease-in-out
            ${isCopied ? 'opacity-0 scale-75 rotate-180' : 'opacity-100 scale-100 rotate-0'}
          `}
        />

        {/* Check Icon */}
        <Check
          className={`
            absolute inset-0 ${sizeClasses[size]} transition-all duration-300 ease-in-out
            text-green-600 dark:text-green-400
            ${isCopied ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-180'}
          `}
        />
      </div>

      {/* Success ripple effect */}
      {isCopied && (
        <div className="absolute inset-0 rounded-md bg-green-100 dark:bg-green-900/20 animate-ping" />
      )}
    </button>
  );
};

export default CopyButton;

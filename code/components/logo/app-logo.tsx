'use client'

export function AppLogo({ size = 'md', showText = true, className = '' }: { size?: 'sm' | 'md' | 'lg'; showText?: boolean; className?: string }) {
  const sizeMap = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-2xl' },
    lg: { icon: 48, text: 'text-4xl' }
  }
  
  const s = sizeMap[size]
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative animate-scale-in hover:scale-110 transition-transform duration-300">
        <svg 
          width={s.icon} 
          height={s.icon} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          <defs>
            <linearGradient id="handLeftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="handRightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="foodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <filter id="handGlow">
              <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Left hand - reaching toward plate */}
          <g filter="url(#handGlow)">
            {/* Left hand palm */}
            <path d="M 6 18 Q 8 14 12 13 L 14 13 Q 15 13 15 14 L 15 22 Q 15 24 13 25 L 9 25 Q 6 25 6 22 Z" fill="url(#handLeftGradient)"/>
            
            {/* Left hand fingers */}
            <rect x="16" y="10" width="2" height="8" rx="1" fill="url(#handLeftGradient)" opacity="0.9"/>
            <rect x="19" y="9" width="2" height="9" rx="1" fill="url(#handLeftGradient)" opacity="0.95"/>
            <rect x="22" y="10" width="2" height="8" rx="1" fill="url(#handLeftGradient)" opacity="0.9"/>
          </g>
          
          {/* Right hand - reaching toward plate */}
          <g filter="url(#handGlow)" transform="translate(48, 0) scale(-1, 1)">
            {/* Right hand palm */}
            <path d="M 6 18 Q 8 14 12 13 L 14 13 Q 15 13 15 14 L 15 22 Q 15 24 13 25 L 9 25 Q 6 25 6 22 Z" fill="url(#handRightGradient)"/>
            
            {/* Right hand fingers */}
            <rect x="16" y="10" width="2" height="8" rx="1" fill="url(#handRightGradient)" opacity="0.9"/>
            <rect x="19" y="9" width="2" height="9" rx="1" fill="url(#handRightGradient)" opacity="0.95"/>
            <rect x="22" y="10" width="2" height="8" rx="1" fill="url(#handRightGradient)" opacity="0.9"/>
          </g>
          
          {/* Donation box/plate - central element */}
          <g filter="url(#handGlow)">
            {/* Box body */}
            <rect x="14" y="20" width="20" height="14" rx="2" fill="url(#boxGradient)" stroke="#f59e0b" strokeWidth="0.8"/>
            
            {/* Box top edge highlight */}
            <path d="M 14 20 Q 24 18 34 20" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" fill="none"/>
            
            {/* Food items inside box */}
            <circle cx="19" cy="24" r="2.5" fill="url(#foodGradient)"/>
            <circle cx="24" cy="25" r="2" fill="url(#foodGradient)" opacity="0.85"/>
            <circle cx="29" cy="24" r="2.5" fill="url(#foodGradient)"/>
            
            {/* Box rim detail */}
            <rect x="14" y="20" width="20" height="2.5" rx="1.5" fill="#fef3c7" opacity="0.4"/>
          </g>
          
          {/* Connection dots - showing unity/partnership */}
          <circle cx="24" cy="8" r="1.5" fill="#ef4444" opacity="0.8"/>
          <circle cx="24" cy="36" r="1.5" fill="#ef4444" opacity="0.8"/>
          
          {/* Subtle heart accent - for care/compassion */}
          <g transform="translate(38, 32)">
            <circle cx="0" cy="0" r="2.5" fill="#ef4444" opacity="0.7"/>
            <path d="M -0.8 -0.3 C -0.8 -0.8 -0.3 -1.2 0.2 -1.2 C 0.6 -1.2 0.9 -0.9 0 -0.2 C -0.9 -0.9 -0.6 -1.2 0 -1.2 C 0.5 -1.2 1 -0.8 1 -0.3 C 1 0.3 0 1 0 1 C 0 1 -1 0.3 -1 -0.3 Z" fill="white" opacity="0.85"/>
          </g>
        </svg>
      </div>
      
      {showText && (
        <div className={`font-bold text-orange-600 dark:text-orange-500 ${s.text} tracking-tight`}>
          FoodFlow
        </div>
      )}
    </div>
  )
}

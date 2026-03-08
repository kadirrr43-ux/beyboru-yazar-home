interface WolfIconProps {
  className?: string;
  size?: number;
  theme?: 'light' | 'dark';
}

export function WolfIcon({ className = '', size = 24, theme = 'light' }: WolfIconProps) {
  const isDark = theme === 'dark';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ cursor: 'pointer' }}
    >
      <defs>
        <linearGradient id="iconGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#FFD700" : "#D4AF37"}>
            <animate
              attributeName="stop-color"
              values={isDark ? "#FFD700;#FFF176;#FFD700" : "#D4AF37;#F4E4BC;#D4AF37"}
              dur="2.5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor={isDark ? "#FFF176" : "#F4E4BC"} />
          <stop offset="100%" stopColor={isDark ? "#FFA500" : "#B8941F"} />
        </linearGradient>
      </defs>

      {/* Yuvarlak çerçeve */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#iconGold)"
        strokeWidth="2"
      />

      {/* TÜRK yazısı */}
      <g fill="url(#iconGold)">
        {/* T */}
        <path d="M15 35 L15 30 L35 30 L35 35 L27 35 L27 55 L23 55 L23 35 Z" />

        {/* Ü */}
        <path d="M37 30 L41 30 L41 50 Q41 55, 45 55 Q49 55, 49 50 L49 30 L53 30 L53 50 Q53 59, 45 59 Q37 59, 37 50 Z M43 26 L47 26 L47 28 L43 28 Z" />

        {/* R */}
        <path d="M57 30 L65 30 Q73 30, 73 38 Q73 43, 69 45 L75 55 L70 55 L65 47 L61 47 L61 55 L57 55 Z 
                 M61 34 L61 43 L65 43 Q69 43, 69 38 Q69 34, 65 34 Z" />

        {/* K */}
        <path d="M77 30 L81 30 L81 40 L90 30 L95 30 L86 41 L96 55 L91 55 L81 43 L81 55 L77 55 Z" />
      </g>
    </svg>
  );
}
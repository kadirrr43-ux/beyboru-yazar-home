interface WolfLogoProps {
  className?: string;
  size?: number;
  theme?: 'light' | 'dark';
}

export default function WolfLogo({ className = '', size = 120, theme = 'light' }: WolfLogoProps) {
  const isDark = theme === 'dark';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} wolf-logo`}
      style={{ cursor: 'pointer' }}
    >
      <defs>
        <linearGradient id="turkGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#FFD700" : "#D4AF37"}>
            <animate
              attributeName="stop-color"
              values={isDark ? "#FFD700;#FFF176;#FFD700" : "#D4AF37;#F4E4BC;#D4AF37"}
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor={isDark ? "#FFF176" : "#F4E4BC"} />
          <stop offset="100%" stopColor={isDark ? "#FFA500" : "#B8941F"} />
        </linearGradient>
        <linearGradient id="turkRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#FF6B6B" : "#8B3A3A"} />
          <stop offset="100%" stopColor={isDark ? "#FF5252" : "#A85A5A"} />
        </linearGradient>
      </defs>

      {/* Ana Çerçeve */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="url(#turkGold)" strokeWidth="2" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="url(#turkGold)" strokeWidth="1" opacity="0.5" />

      {/* Üst: Göktürkçe */}
      <g fill="url(#turkGold)">
        {/* T */}
        <path d="M25 35 L25 25 L45 25 L45 30 L40 30 L40 55 L45 55 L45 60 L25 60 L25 55 L30 55 L30 30 L25 30 Z" />
        {/* Ü */}
        <path d="M50 30 L55 30 L55 55 L60 55 L60 60 L50 60 L50 55 L55 55 L55 35 L50 35 Z" />
        {/* R */}
        <path d="M65 25 L75 25 L75 45 L80 40 L85 45 L85 55 L90 55 L90 60 L70 60 L70 55 L75 55 L75 50 L70 50 L70 45 L75 45 L75 30 L70 30 Z" />
        {/* K */}
        <path d="M95 25 L105 25 L105 40 L110 35 L115 40 L115 55 L120 55 L120 60 L100 60 L100 55 L105 55 L105 50 L100 50 L100 45 L105 45 L105 30 L100 30 Z" />
      </g>

      <text x="100" y="72" textAnchor="middle" fill="url(#turkGold)" fontSize="8" fontFamily="serif" opacity="0.7">
        GÖKTÜRKÇE
      </text>

      {/* Ortada Osmanlıca */}
      <g fill="url(#turkRed)">
        <path d="M60 95 Q60 90, 65 90 L70 90 Q75 90, 75 95 Q75 100, 70 100 L65 100 Q60 100, 60 95 Z M67 85 L68 82" />
        <path d="M78 92 Q78 88, 82 88 L88 88 Q92 88, 92 92 Q92 96, 88 96 L82 96 Q78 96, 78 92 Z M85 85 L86 82" />
        <path d="M95 95 Q95 88, 102 88 L115 88 Q122 88, 122 95 Q122 102, 115 102 L102 102 Q95 102, 95 95 Z M108 82 L110 78" />
      </g>

      <text x="100" y="115" textAnchor="middle" fill="url(#turkRed)" fontSize="8" fontFamily="serif" opacity="0.7">
        OSMANLICA
      </text>

      {/* Latin */}
      <g fill="url(#turkGold)">
        <path d="M55 135 L55 130 L85 130 L85 135 L72 135 L72 160 L68 160 L68 135 Z" />
        <path d="M88 130 L93 130 L93 155 Q93 162, 100 162 Q107 162, 107 155 L107 130 L112 130 L112 155 Q112 167, 100 167 Q88 167, 88 155 Z M97 125 L103 125 L103 128 L97 128 Z" />
        <path d="M118 130 L130 130 Q140 130, 140 140 Q140 147, 135 149 L142 160 L137 160 L130 150 L123 150 L123 160 L118 160 Z M123 135 L123 145 L130 145 Q135 145, 135 140 Q135 135, 130 135 Z" />
        <path d="M145 130 L150 130 L150 143 L162 130 L168 130 L155 145 L170 160 L164 160 L150 147 L150 160 L145 160 Z" />
      </g>

      <text x="100" y="175" textAnchor="middle" fill="url(#turkGold)" fontSize="8" fontFamily="serif" opacity="0.7">
        TÜRKÇE
      </text>

      {/* Dekoratif yıldızlar */}
      <g fill="url(#turkGold)" opacity="0.3">
        <polygon points="15,100 17,106 23,106 18,110 20,116 15,112 10,116 12,110 7,106 13,106" />
        <polygon points="185,100 187,106 193,106 188,110 190,116 185,112 180,116 182,110 177,106 183,106" />
      </g>
    </svg>
  );
}
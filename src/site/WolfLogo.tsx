interface WolfLogoProps {
  className?: string
  size?: number
  showText?: boolean
}

export default function WolfLogo({ className = "", size = 120, showText = true }: WolfLogoProps) {
  return (
    <svg
      width={size}
      height={showText ? size * 1.25 : size}
      viewBox={showText ? "0 0 200 250" : "0 0 200 200"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >

      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37"/>
          <stop offset="50%" stopColor="#F4E4BC"/>
          <stop offset="100%" stopColor="#B8941F"/>
        </linearGradient>
      </defs>

      {/* Hilal */}
      <path
        d="M70 45
           A30 30 0 1 1 70 105
           A22 22 0 1 0 70 45"
        fill="url(#gold)"
      />

      {/* Yıldız */}
      <polygon
        points="115,65 120,78 135,78 123,86 128,100 115,90 102,100 107,86 95,78 110,78"
        fill="url(#gold)"
      />

      {/* Kurt Kafası */}
      <g fill="url(#gold)" stroke="url(#gold)" strokeWidth="2">

        {/* Sol Kulak */}
        <path d="M60 70 L45 30 L80 55 Z"/>

        {/* Sağ Kulak */}
        <path d="M140 70 L155 30 L120 55 Z"/>

        {/* Kafa */}
        <path d="
          M60 80
          Q50 110 70 140
          Q85 165 100 170
          Q115 165 130 140
          Q150 110 140 80
          Q120 60 100 60
          Q80 60 60 80
          Z
        "/>

        {/* Burun üstü */}
        <path d="M92 60 L100 45 L108 60 Z"/>

        {/* Gözler */}
        <ellipse cx="80" cy="110" rx="6" ry="4" fill="#111"/>
        <ellipse cx="120" cy="110" rx="6" ry="4" fill="#111"/>

        {/* Burun */}
        <path d="M95 140 L100 135 L105 140 L100 150 Z" fill="#111"/>

        {/* Ağız */}
        <path d="M85 155 Q100 165 115 155" fill="none"/>
      </g>

      {/* Göktürkçe TÜRK */}
      {showText && (
        <g transform="translate(30,210)" fill="url(#gold)">
          <text
            x="0"
            y="0"
            fontSize="36"
            fontFamily="serif"
            letterSpacing="10"
          >
            𐱅𐰇𐰺𐰰
          </text>
        </g>
      )}

    </svg>
  )
}
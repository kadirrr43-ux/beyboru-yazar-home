// TÜRK Logo - Üç Dilli (Türkçe, Osmanlıca, Göktürkçe)

interface WolfLogoProps {
  className?: string;
  size?: number;
}

export default function WolfLogo({ className = '', size = 120 }: WolfLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="turkGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F4E4BC" />
          <stop offset="100%" stopColor="#B8941F" />
        </linearGradient>
        <linearGradient id="turkRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B3A3A" />
          <stop offset="100%" stopColor="#A85A5A" />
        </linearGradient>
      </defs>

      {/* Ana Çerçeve - Yuvarlak */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="url(#turkGold)" strokeWidth="2" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="url(#turkGold)" strokeWidth="1" opacity="0.5" />

      {/* Üstte: Göktürkçe TÜRK */}
      <g fill="url(#turkGold)">
        {/* T (𐱃) */}
        <path d="M25 35 L25 25 L45 25 L45 30 L40 30 L40 55 L45 55 L45 60 L25 60 L25 55 L30 55 L30 30 L25 30 Z" />

        {/* Ü (𐰇) */}
        <path d="M50 30 L55 30 L55 55 L60 55 L60 60 L50 60 L50 55 L55 55 L55 35 L50 35 Z" />

        {/* R (𐰼) */}
        <path d="M65 25 L75 25 L75 45 L80 40 L85 45 L85 55 L90 55 L90 60 L70 60 L70 55 L75 55 L75 50 L70 50 L70 45 L75 45 L75 30 L70 30 Z" />

        {/* K (𐰴) */}
        <path d="M95 25 L105 25 L105 40 L110 35 L115 40 L115 55 L120 55 L120 60 L100 60 L100 55 L105 55 L105 50 L100 50 L100 45 L105 45 L105 30 L100 30 Z" />
      </g>

      {/* Göktürkçe yazıyı belirten küçük işaret */}
      <text x="100" y="72" textAnchor="middle" fill="url(#turkGold)" fontSize="8" fontFamily="serif" opacity="0.7">
        GÖKTÜRKÇE
      </text>

      {/* Ortada: Osmanlıca ترک */}
      <g fill="url(#turkRed)">
        {/* ت (Te) */}
        <path d="M60 95 Q60 90, 65 90 L70 90 Q75 90, 75 95 Q75 100, 70 100 L65 100 Q60 100, 60 95 Z M67 85 L68 82" />

        {/* ر (Re) */}
        <path d="M78 92 Q78 88, 82 88 L88 88 Q92 88, 92 92 Q92 96, 88 96 L82 96 Q78 96, 78 92 Z M85 85 L86 82" />

        {/* ک (Kaf) */}
        <path d="M95 95 Q95 88, 102 88 L115 88 Q122 88, 122 95 Q122 102, 115 102 L102 102 Q95 102, 95 95 Z M108 82 L110 78" />
      </g>

      {/* Osmanlıca yazıyı belirten küçük işaret */}
      <text x="100" y="115" textAnchor="middle" fill="url(#turkRed)" fontSize="8" fontFamily="serif" opacity="0.7">
        OSMANLICA
      </text>

      {/* Altta: Latin TÜRK */}
      <g fill="url(#turkGold)">
        {/* T */}
        <path d="M55 135 L55 130 L85 130 L85 135 L72 135 L72 160 L68 160 L68 135 Z" />

        {/* Ü */}
        <path d="M88 130 L93 130 L93 155 Q93 162, 100 162 Q107 162, 107 155 L107 130 L112 130 L112 155 Q112 167, 100 167 Q88 167, 88 155 Z M97 125 L103 125 L103 128 L97 128 Z" />

        {/* R */}
        <path d="M118 130 L130 130 Q140 130, 140 140 Q140 147, 135 149 L142 160 L137 160 L130 150 L123 150 L123 160 L118 160 Z M123 135 L123 145 L130 145 Q135 145, 135 140 Q135 135, 130 135 Z" />

        {/* K */}
        <path d="M145 130 L150 130 L150 143 L162 130 L168 130 L155 145 L170 160 L164 160 L150 147 L150 160 L145 160 Z" />
      </g>

      {/* Latin yazıyı belirten küçük işaret */}
      <text x="100" y="175" textAnchor="middle" fill="url(#turkGold)" fontSize="8" fontFamily="serif" opacity="0.7">
        TÜRKÇE
      </text>

      {/* Dekoratif ay yıldız motifleri */}
      <g fill="url(#turkGold)" opacity="0.3">
        {/* Sol yıldız */}
        <polygon points="15,100 17,106 23,106 18,110 20,116 15,112 10,116 12,110 7,106 13,106" />
        {/* Sağ yıldız */}
        <polygon points="185,100 187,106 193,106 188,110 190,116 185,112 180,116 182,110 177,106 183,106" />
      </g>
    </svg>
  );
}

// Küçük ikon versiyonu (sadece TÜRK kısaltması)
export function WolfIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="iconGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8941F" />
        </linearGradient>
      </defs>

      {/* Yuvarlak çerçeve */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#iconGold)" strokeWidth="2" />

      {/* TÜRK yazısı */}
      <g fill="url(#iconGold)">
        {/* T */}
        <path d="M15 35 L15 30 L35 30 L35 35 L27 35 L27 55 L23 55 L23 35 Z" />

        {/* Ü */}
        <path d="M37 30 L41 30 L41 50 Q41 55, 45 55 Q49 55, 49 50 L49 30 L53 30 L53 50 Q53 59, 45 59 Q37 59, 37 50 Z M43 26 L47 26 L47 28 L43 28 Z" />

        {/* R */}
        <path d="M57 30 L65 30 Q73 30, 73 38 Q73 43, 69 45 L75 55 L70 55 L65 47 L61 47 L61 55 L57 55 Z M61 34 L61 43 L65 43 Q69 43, 69 38 Q69 34, 65 34 Z" />

        {/* K */}
        <path d="M77 30 L81 30 L81 40 L90 30 L95 30 L86 41 L96 55 L91 55 L81 43 L81 55 L77 55 Z" />
      </g>
    </svg>
  );
}

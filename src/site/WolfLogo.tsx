// Bozkurt Logo - Göktürkçe TÜRK Yazılı

interface WolfLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function WolfLogo({ className = '', size = 120, showText = true }: WolfLogoProps) {
  return (
    <svg
      width={size}
      height={showText ? size * 1.3 : size}
      viewBox={showText ? "0 0 200 260" : "0 0 200 200"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="wolfGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F4E4BC" />
          <stop offset="100%" stopColor="#B8941F" />
        </linearGradient>
      </defs>
      
      {/* Yukarı Bakan Kurt Başı */}
      <g fill="url(#wolfGold)">
        {/* Sol Kulak */}
        <path d="M55 85 L45 45 L70 70 L75 90 Z" />
        
        {/* Sağ Kulak */}
        <path d="M145 85 L155 45 L130 70 L125 90 Z" />
        
        {/* Kafa Ana Şekli */}
        <path d="M50 95 
                 C45 110, 50 130, 60 145
                 C70 160, 85 170, 100 175
                 C115 170, 130 160, 140 145
                 C150 130, 155 110, 150 95
                 C145 80, 125 75, 100 75
                 C75 75, 55 80, 50 95
                 Z" />
        
        {/* Burun Üstü */}
        <path d="M90 75 L100 55 L110 75 L100 85 Z" />
        
        {/* Gözler - Kapalı/Uluma pozisyonu */}
        <path d="M65 115 L85 110 L90 120 L70 125 Z" fill="#1a1a1f" />
        <path d="M135 115 L115 110 L110 120 L130 125 Z" fill="#1a1a1f" />
        
        {/* Burun */}
        <path d="M95 145 L100 140 L105 145 L100 155 Z" fill="#1a1a1f" />
        
        {/* Ağız Çizgisi */}
        <path d="M80 160 Q100 165, 120 160" fill="none" stroke="url(#wolfGold)" strokeWidth="2" />
        
        {/* Yele Detayları */}
        <path d="M45 120 L35 140 L45 150" fill="none" stroke="url(#wolfGold)" strokeWidth="2" />
        <path d="M40 145 L30 165 L42 175" fill="none" stroke="url(#wolfGold)" strokeWidth="2" />
        <path d="M155 120 L165 140 L155 150" fill="none" stroke="url(#wolfGold)" strokeWidth="2" />
        <path d="M160 145 L170 165 L158 175" fill="none" stroke="url(#wolfGold)" strokeWidth="2" />
        
        {/* Ense Tüyleri */}
        <path d="M70 170 L65 190 L75 185" fill="none" stroke="url(#wolfGold)" strokeWidth="2" />
        <path d="M100 175 L100 195 L105 185" fill="none" stroke="url(#wolfGold)" strokeWidth="2" />
        <path d="M130 170 L135 190 L125 185" fill="none" stroke="url(#wolfGold)" strokeWidth="2" />
      </g>

      {/* Göktürkçe TÜRK Yazısı */}
      {showText && (
        <g transform="translate(0, 200)" fill="url(#wolfGold)">
          {/* T - 𐱃 */}
          <path d="M15 0 L35 0 L35 5 L30 5 L30 35 L35 35 L35 40 L15 40 L15 35 L20 35 L20 5 L15 5 Z" />
          
          {/* Ü - 𐰇 */}
          <path d="M45 5 L55 5 L55 35 L60 35 L60 40 L45 40 L45 35 L50 35 L50 10 L45 10 Z" />
          
          {/* R - 𐰺 */}
          <path d="M70 0 L80 0 L80 20 L85 15 L90 20 L90 35 L95 35 L95 40 L75 40 L75 35 L80 35 L80 25 L75 25 Z" />
          
          {/* K - 𐰴 */}
          <path d="M105 0 L115 0 L115 15 L120 10 L125 15 L125 35 L130 35 L130 40 L110 40 L110 35 L115 35 L115 25 L110 25 L110 20 L115 20 L115 5 L110 5 Z" />
        </g>
      )}
    </svg>
  );
}

// Küçük ikon versiyonu (sadece kurt, yazısız)
export function WolfIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g fill="currentColor">
        {/* Sol Kulak */}
        <path d="M55 85 L45 45 L70 70 L75 90 Z" />
        
        {/* Sağ Kulak */}
        <path d="M145 85 L155 45 L130 70 L125 90 Z" />
        
        {/* Kafa */}
        <path d="M50 95 
                 C45 110, 50 130, 60 145
                 C70 160, 85 170, 100 175
                 C115 170, 130 160, 140 145
                 C150 130, 155 110, 150 95
                 C145 80, 125 75, 100 75
                 C75 75, 55 80, 50 95
                 Z" />
        
        {/* Burun Üstü */}
        <path d="M90 75 L100 55 L110 75 L100 85 Z" />
        
        {/* Gözler */}
        <path d="M65 115 L85 110 L90 120 L70 125 Z" fill="#1a1a1f" />
        <path d="M135 115 L115 110 L110 120 L130 125 Z" fill="#1a1a1f" />
        
        {/* Burun */}
        <path d="M95 145 L100 140 L105 145 L100 155 Z" fill="#1a1a1f" />
      </g>
    </svg>
  );
}

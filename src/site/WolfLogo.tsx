export default function TurkishWolfEmoji({ size = 80 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >

      {/* Hilal */}
      <path
        d="M35 25
           A20 20 0 1 1 35 65
           A14 14 0 1 0 35 25"
        fill="#E6C56D"
      />

      {/* Yıldız */}
      <polygon
        points="65,35 68,42 76,42 70,47 73,55 65,50 57,55 60,47 54,42 62,42"
        fill="#E6C56D"
      />

      {/* Kulaklar */}
      <polygon points="35,45 45,20 55,45" fill="#E6C56D"/>
      <polygon points="65,45 75,20 85,45" fill="#E6C56D"/>

      {/* Kafa */}
      <circle cx="60" cy="70" r="28" fill="#E6C56D"/>

      {/* Gözler */}
      <circle cx="50" cy="65" r="3" fill="#222"/>
      <circle cx="70" cy="65" r="3" fill="#222"/>

      {/* Burun */}
      <polygon points="60,72 56,78 64,78" fill="#222"/>

      {/* Ağız */}
      <path d="M52 85 Q60 90 68 85" stroke="#222" strokeWidth="2" fill="none"/>

    </svg>
  )
}
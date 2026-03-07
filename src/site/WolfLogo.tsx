export default function TurkishFlag({ size = 80 }) {
  return (
    <svg
      width={size}
      height={size * 0.66}
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Kırmızı arka plan */}
      <rect width="120" height="80" fill="#E30A17" />

      {/* Hilal */}
      <circle cx="50" cy="40" r="20" fill="white" />
      <circle cx="58" cy="40" r="16" fill="#E30A17" />

      {/* Yıldız */}
      <polygon
        points="78,40 82,48 90,48 84,53 86,61 78,56 70,61 72,53 66,48 74,48"
        fill="white"
      />
    </svg>
  );
}
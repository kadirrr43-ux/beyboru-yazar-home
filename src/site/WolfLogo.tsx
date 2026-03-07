export default function WolfLogo({ size = 120 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 140"
      xmlns="http://www.w3.org/2000/svg"
    >

      {/* Kurt Kafası */}
      <path
        d="
        M20 110
        L60 80
        L90 40
        L105 20
        L115 40
        L145 55
        L175 70
        L155 85
        L130 95
        L90 100
        L50 110
        Z
        "
        fill="white"
      />

      {/* Dişler */}
      <path
        d="
        M125 75
        l5 5
        l5 -5
        l5 5
        l5 -5
        l5 5
        "
        stroke="black"
        strokeWidth="2"
        fill="none"
      />

      {/* Göz */}
      <circle cx="125" cy="60" r="3" fill="black"/>

    </svg>
  )
}
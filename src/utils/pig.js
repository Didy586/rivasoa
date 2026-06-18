export function pigSVG(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 200 200">
    <defs>
      <radialGradient id="bodyG" cx="45%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#ffb3d1"/>
        <stop offset="60%" stop-color="#f472b6"/>
        <stop offset="100%" stop-color="#db2777"/>
      </radialGradient>
      <radialGradient id="bellyG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffd6e8"/>
        <stop offset="100%" stop-color="#fbcfe8"/>
      </radialGradient>
      <radialGradient id="snoutG" cx="40%" cy="35%" r="55%">
        <stop offset="0%" stop-color="#fda4af"/>
        <stop offset="100%" stop-color="#f43f5e"/>
      </radialGradient>
      <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="4" dy="8" stdDeviation="6" flood-color="#be185d" flood-opacity="0.35"/>
      </filter>
    </defs>
    <ellipse cx="100" cy="188" rx="48" ry="10" fill="#db2777" opacity="0.2"/>
    <ellipse cx="100" cy="115" rx="62" ry="58" fill="url(#bodyG)" filter="url(#shadow3d)"/>
    <ellipse cx="100" cy="125" rx="36" ry="30" fill="url(#bellyG)" opacity=".7"/>
    <ellipse cx="58" cy="68" rx="18" ry="22" fill="#f472b6" transform="rotate(-20 58 68)"/>
    <ellipse cx="58" cy="71" rx="10" ry="13" fill="#fb7185" transform="rotate(-20 58 71)"/>
    <ellipse cx="142" cy="68" rx="18" ry="22" fill="#f472b6" transform="rotate(20 142 68)"/>
    <ellipse cx="142" cy="71" rx="10" ry="13" fill="#fb7185" transform="rotate(20 142 71)"/>
    <circle cx="100" cy="88" r="46" fill="url(#bodyG)" filter="url(#shadow3d)"/>
    <circle cx="82" cy="78" r="9" fill="white"/>
    <circle cx="84" cy="78" r="5" fill="#1e0010"/>
    <circle cx="86" cy="76" r="2" fill="white"/>
    <circle cx="118" cy="78" r="9" fill="white"/>
    <circle cx="120" cy="78" r="5" fill="#1e0010"/>
    <circle cx="122" cy="76" r="2" fill="white"/>
    <ellipse cx="100" cy="100" rx="22" ry="17" fill="url(#snoutG)"/>
    <circle cx="92" cy="100" r="6" fill="#be123c" opacity=".6"/>
    <circle cx="108" cy="100" r="6" fill="#be123c" opacity=".6"/>
    <ellipse cx="68" cy="93" rx="12" ry="8" fill="#fb7185" opacity=".45"/>
    <ellipse cx="132" cy="93" rx="12" ry="8" fill="#fb7185" opacity=".45"/>
    <rect x="62" y="162" width="22" height="26" rx="11" fill="#f472b6" filter="url(#shadow3d)"/>
    <rect x="116" y="162" width="22" height="26" rx="11" fill="#f472b6" filter="url(#shadow3d)"/>
    <path d="M162 120 Q178 108 170 98 Q162 88 172 82" fill="none" stroke="#f472b6" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
}

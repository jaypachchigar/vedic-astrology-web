"use client";

interface Planet {
  name: string;
  house: number;
}

interface NorthIndianChartProps {
  planets: Planet[];
  ascendant: number;
}

export function NorthIndianChart({ planets, ascendant }: NorthIndianChartProps) {
  const houseContents: { [key: number]: string[] } = {};

  planets.forEach(planet => {
    if (!houseContents[planet.house]) {
      houseContents[planet.house] = [];
    }
    houseContents[planet.house].push(planet.name);
  });

  const signNames = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                     'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  // Helper to render planets with wrapping
  const renderPlanets = (house: number, x: number, y: number, maxWidth: number = 120) => {
    const planetsList = houseContents[house] || [];
    if (planetsList.length === 0) return null;

    return (
      <foreignObject x={x - maxWidth/2} y={y - 10} width={maxWidth} height="80">
        <div style={{
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#c00',
          textAlign: 'center',
          wordWrap: 'break-word',
          lineHeight: '1.3'
        }}>
          {planetsList.join(', ')}
        </div>
      </foreignObject>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <svg viewBox="0 0 800 800" className="w-full h-full bg-white border-4 border-black">

        {/* Main square border */}
        <rect x="10" y="10" width="780" height="780" fill="none" stroke="#000" strokeWidth="4" />

        {/* Inner diamond - creates 12 equal houses */}
        <path d="M 400 10 L 790 400 L 400 790 L 10 400 Z" fill="none" stroke="#000" strokeWidth="3" />

        {/* Diagonal from top-left to center to bottom-left */}
        <line x1="10" y1="10" x2="400" y2="400" stroke="#000" strokeWidth="2.5" />
        <line x1="400" y1="400" x2="10" y2="790" stroke="#000" strokeWidth="2.5" />

        {/* Diagonal from top-right to center to bottom-right */}
        <line x1="790" y1="10" x2="400" y2="400" stroke="#000" strokeWidth="2.5" />
        <line x1="400" y1="400" x2="790" y2="790" stroke="#000" strokeWidth="2.5" />

        {/* HOUSE 1 - TOP (Ascendant is here) */}
        <text x="400" y="100" fontSize="14" fontWeight="bold" textAnchor="middle">H1</text>
        <text x="400" y="125" fontSize="12" fill="#666" textAnchor="middle">{signNames[(ascendant - 1) % 12]}</text>
        {renderPlanets(1, 400, 155, 180)}

        {/* HOUSE 2 - TOP LEFT TRIANGLE */}
        <text x="205" y="85" fontSize="14" fontWeight="bold" textAnchor="middle">H2</text>
        <text x="205" y="105" fontSize="12" fill="#666" textAnchor="middle">{signNames[ascendant % 12]}</text>
        {renderPlanets(2, 205, 125, 140)}

        {/* HOUSE 3 - LEFT TOP */}
        <text x="75" y="190" fontSize="14" fontWeight="bold" textAnchor="middle">H3</text>
        <text x="75" y="210" fontSize="12" fill="#666" textAnchor="middle">{signNames[(ascendant + 1) % 12]}</text>
        {renderPlanets(3, 75, 230, 100)}

        {/* HOUSE 4 - LEFT CENTER */}
        <text x="140" y="385" fontSize="14" fontWeight="bold" textAnchor="middle">H4</text>
        <text x="140" y="405" fontSize="12" fill="#666" textAnchor="middle">{signNames[(ascendant + 2) % 12]}</text>
        {renderPlanets(4, 140, 425, 140)}

        {/* HOUSE 5 - LEFT BOTTOM */}
        <text x="75" y="580" fontSize="14" fontWeight="bold" textAnchor="middle">H5</text>
        <text x="75" y="600" fontSize="12" fill="#666" textAnchor="middle">{signNames[(ascendant + 3) % 12]}</text>
        {renderPlanets(5, 75, 620, 100)}

        {/* HOUSE 6 - BOTTOM LEFT TRIANGLE */}
        <text x="205" y="690" fontSize="14" fontWeight="bold" textAnchor="middle">H6</text>
        <text x="205" y="710" fontSize="12" fill="#666" textAnchor="middle">{signNames[(ascendant + 4) % 12]}</text>
        {renderPlanets(6, 205, 730, 140)}

        {/* HOUSE 7 - BOTTOM CENTER */}
        <text x="400" y="640" fontSize="14" fontWeight="bold" textAnchor="middle">H7</text>
        <text x="400" y="660" fontSize="12" fill="#666" textAnchor="middle">{signNames[(ascendant + 5) % 12]}</text>
        {renderPlanets(7, 400, 680, 180)}

        {/* HOUSE 8 - BOTTOM RIGHT TRIANGLE */}
        <text x="595" y="690" fontSize="14" fontWeight="bold" textAnchor="middle">H8</text>
        <text x="595" y="710" fontSize="12" fill="#666" textAnchor="middle">{signNames[(ascendant + 6) % 12]}</text>
        {renderPlanets(8, 595, 730, 140)}

        {/* HOUSE 9 - RIGHT BOTTOM */}
        <text x="725" y="580" fontSize="14" fontWeight="bold" textAnchor="middle">H9</text>
        <text x="725" y="600" fontSize="12" fill="#666" textAnchor="middle">{signNames[(ascendant + 7) % 12]}</text>
        {renderPlanets(9, 725, 620, 100)}

        {/* HOUSE 10 - RIGHT CENTER */}
        <text x="660" y="385" fontSize="14" fontWeight="bold" textAnchor="middle">H10</text>
        <text x="660" y="405" fontSize="12" fill="#666" textAnchor="middle">{signNames[(ascendant + 8) % 12]}</text>
        {renderPlanets(10, 660, 425, 140)}

        {/* HOUSE 11 - RIGHT TOP */}
        <text x="725" y="190" fontSize="14" fontWeight="bold" textAnchor="middle">H11</text>
        <text x="725" y="210" fontSize="12" fill="#666" textAnchor="middle">{signNames[(ascendant + 9) % 12]}</text>
        {renderPlanets(11, 725, 230, 100)}

        {/* HOUSE 12 - TOP RIGHT TRIANGLE */}
        <text x="595" y="85" fontSize="14" fontWeight="bold" textAnchor="middle">H12</text>
        <text x="595" y="105" fontSize="12" fill="#666" textAnchor="middle">{signNames[(ascendant + 10) % 12]}</text>
        {renderPlanets(12, 595, 125, 140)}
      </svg>
    </div>
  );
}

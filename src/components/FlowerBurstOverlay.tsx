import React, { useMemo } from 'react';

interface FlowerBurstOverlayProps {
  stage: 'heart' | 'fullscreen';
}

interface FlowerParticle {
  id: number;
  x: number;
  y: number;
  heartX: number;
  heartY: number;
  size: number;
  color: string;
  centerColor: string;
  rotation: number;
  petals: number;
}

const FLOWER_PALETTE = [
  { petal: '#ff4081', center: '#fff176' },
  { petal: '#f48fb1', center: '#ffd54f' },
  { petal: '#ff80ab', center: '#ffffff' },
  { petal: '#ce93d8', center: '#fff59d' },
  { petal: '#81d4fa', center: '#ffee58' },
  { petal: '#ff8a65', center: '#fff9c4' },
  { petal: '#ffd54f', center: '#f06292' },
  { petal: '#f06292', center: '#fffde7' },
  { petal: '#b39ddb', center: '#ffe082' },
];

function RenderSvgFlower({
  color,
  centerColor,
  size,
  petals,
}: {
  color: string;
  centerColor: string;
  size: number;
  petals: number;
}) {
  const petalAngles = Array.from({ length: petals }, (_, i) => (360 / petals) * i);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="drop-shadow-md select-none pointer-events-none"
    >
      <g transform="translate(50,50)">
        {petalAngles.map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <ellipse
              cx="0"
              cy="-24"
              rx="14"
              ry="23"
              fill={color}
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.5"
            />
            <ellipse
              cx="0"
              cy="-20"
              rx="7"
              ry="14"
              fill="rgba(255,255,255,0.22)"
            />
          </g>
        ))}
        <circle
          cx="0"
          cy="0"
          r="15"
          fill={centerColor}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
        />
        <circle cx="-4" cy="-4" r="4" fill="rgba(255,255,255,0.65)" />
      </g>
    </svg>
  );
}

export const FlowerBurstOverlay: React.FC<FlowerBurstOverlayProps> = ({ stage }) => {
  const flowers = useMemo<FlowerParticle[]>(() => {
    const count = 88;
    return Array.from({ length: count }, (_, i) => {
      const t = (i / count) * Math.PI * 2;
      const r = 0.65 + (i % 5) * 0.1;
      const hx = 16 * Math.pow(Math.sin(t), 3) * r;
      const hy =
        -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;

      const cols = 11;
      const rows = 8;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const fx = (col / (cols - 1)) * 108 - 4 + ((i * 17) % 9) - 4;
      const fy = (row / (rows - 1)) * 108 - 4 + ((i * 23) % 9) - 4;

      const palette = FLOWER_PALETTE[i % FLOWER_PALETTE.length];
      return {
        id: i,
        x: fx,
        y: fy,
        heartX: hx * 8.5,
        heartY: hy * 8.5,
        size: 74 + (i % 4) * 22,
        color: palette.petal,
        centerColor: palette.center,
        rotation: (i * 47) % 360,
        petals: i % 2 === 0 ? 8 : 6,
      };
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center"
      aria-label="Hiệu ứng hoa nở chúc mừng Mi"
    >
      {stage === 'fullscreen' && (
        <div className="absolute inset-0 bg-pink-200/80 backdrop-blur-sm transition-opacity duration-300" />
      )}

      {flowers.map((f) => {
        if (stage === 'heart') {
          return (
            <div
              key={f.id}
              style={{
                transform: `translate(${f.heartX}px, ${f.heartY}px) rotate(${f.rotation}deg)`,
              }}
              className="absolute transition-all duration-500 animate-pop-in"
            >
              <RenderSvgFlower
                color={f.color}
                centerColor={f.centerColor}
                size={f.size * 0.72}
                petals={f.petals}
              />
            </div>
          );
        }

        return (
          <div
            key={f.id}
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              transform: `translate(-50%, -50%) scale(1.4) rotate(${f.rotation + 90}deg)`,
            }}
            className="absolute transition-all duration-700"
          >
            <RenderSvgFlower
              color={f.color}
              centerColor={f.centerColor}
              size={f.size * 1.25}
              petals={f.petals}
            />
          </div>
        );
      })}

      <div className="relative z-10 bg-white/95 backdrop-blur-md px-7 py-4 rounded-3xl shadow-2xl border-2 border-pink-400 text-center animate-pop-in">
        <p className="text-xl md:text-2xl font-bold text-pink-600">
          Chào mừng công chúa Mi yêu dấu! 💕
        </p>
        <p className="text-xs md:text-sm text-pink-500 font-medium mt-1">
          Đang mở thế giới nhỏ của tụi mình...
        </p>
      </div>
    </div>
  );
};

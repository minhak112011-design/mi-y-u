import React, { useState, useMemo } from 'react';
import { X, Maximize2, Minimize2, Sparkles, Cake, Heart, Flame } from 'lucide-react';
import { MI_PHOTOS, FLOATING_LOVE_NOTES, MiPhoto } from '../utils/giftData';
import { playPopSound, playUnlockSparkleSound } from '../utils/soundEffects';

interface GiftModalProps {
  onClose: () => void;
}

interface TapBurst {
  id: number;
  x: number;
  y: number;
  text: string;
}

export const GiftModal: React.FC<GiftModalProps> = ({ onClose }) => {
  const [scene, setScene] = useState<'cake' | 'bubbles'>('cake');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [activeBubblePhoto, setActiveBubblePhoto] = useState<MiPhoto | null>(null);
  const [tapBursts, setTapBursts] = useState<TapBurst[]>([]);

  const floatingBubbles = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const photo = MI_PHOTOS[i % MI_PHOTOS.length];
      return {
        id: i,
        photo,
        left: 6 + ((i * 19) % 82),
        size: 68 + (i % 3) * 18,
        duration: 8.5 + (i % 5) * 1.8,
        delay: (i % 6) * 0.9,
      };
    });
  }, []);

  const floatingPills = useMemo(() => {
    return FLOATING_LOVE_NOTES.map((text, i) => ({
      id: i,
      text,
      left: 10 + ((i * 23) % 76),
      duration: 9 + (i % 4) * 2,
      delay: (i % 5) * 1.1,
    }));
  }, []);

  const handleCanvasTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const randomNote =
      FLOATING_LOVE_NOTES[Math.floor(Math.random() * FLOATING_LOVE_NOTES.length)];

    playPopSound();
    const burstId = Date.now() + Math.random();
    setTapBursts((prev) => [...prev.slice(-6), { id: burstId, x, y, text: randomNote }]);

    if (scene === 'cake') {
      playUnlockSparkleSound();
      setScene('bubbles');
    }
  };

  const renderCakeTier = (
    radiusPx: number,
    widthPx: number,
    heightPx: number,
    facetsCount: number,
    offsetYClass: string
  ) => {
    const facets = Array.from({ length: facetsCount }, (_, i) => {
      const angle = (360 / facetsCount) * i;
      const photo = MI_PHOTOS[i % MI_PHOTOS.length];
      return { angle, photo, id: i };
    });

    return (
      <div
        className={`relative preserve-3d flex items-center justify-center ${offsetYClass}`}
        style={{ width: widthPx, height: heightPx }}
      >
        <div
          className="absolute rounded-full bg-gradient-to-tr from-pink-200 via-white to-pink-100 border-4 border-pink-300 shadow-inner"
          style={{
            width: radiusPx * 2,
            height: radiusPx * 2,
            transform: `rotateX(90deg) translateZ(${heightPx / 2}px)`,
          }}
        />
        {facets.map((f) => (
          <div
            key={f.id}
            className="absolute overflow-hidden rounded-md border border-pink-200/90 bg-white shadow-xs"
            style={{
              width: widthPx,
              height: heightPx,
              transform: `rotateY(${f.angle}deg) translateZ(${radiusPx}px)`,
              backfaceVisibility: 'visible',
            }}
          >
            <img
              src={f.photo.src}
              alt={f.photo.caption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              style={{
                objectPosition: f.photo.objectPosition,
              }}
            />
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/90 to-transparent" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-pink-950/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Món quà 3D bất ngờ tặng Mi"
        className={`${
          isFullscreen
            ? 'fixed inset-0 rounded-none'
            : 'w-full max-w-[820px] h-[82vh] max-h-[640px] rounded-[32px] border-2 border-pink-300'
        } bg-gradient-to-b from-[#fce4ec] via-[#f8bbd0] to-[#f48fb1] shadow-[0_25px_75px_rgba(136,14,79,0.45)] relative overflow-hidden flex flex-col justify-between transition-all duration-300 animate-pop-in`}
      >
        <div className="relative z-30 flex items-center justify-between p-4 sm:p-5">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setScene(scene === 'cake' ? 'bubbles' : 'cake');
              }}
              className="py-2 px-3.5 rounded-full bg-white/90 hover:bg-white text-rose-600 text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {scene === 'cake' ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Xem Bong Bóng Kỷ Niệm</span>
                </>
              ) : (
                <>
                  <Cake className="w-4 h-4" />
                  <span>Xem Bánh Kem 3D Của Mi</span>
                </>
              )}
            </button>

            {scene === 'cake' && (
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setCandlesLit((prev) => !prev);
                }}
                className="py-2 px-3.5 rounded-full bg-rose-500/90 hover:bg-rose-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4" />
                <span>{candlesLit ? 'Thổi nến ước nguyện' : 'Thắp lại nến lung linh'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setIsFullscreen((prev) => !prev);
              }}
              aria-label={isFullscreen ? 'Thu nhỏ màn hình' : 'Phóng to toàn màn hình'}
              className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                onClose();
              }}
              aria-label="Đóng món quà"
              className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive Stage Area */}
        <div
          onClick={handleCanvasTap}
          className="relative flex-1 w-full flex items-center justify-center overflow-hidden cursor-pointer select-none"
        >
          {scene === 'cake' ? (
            <div className="perspective-1000 w-full h-full flex flex-col items-center justify-center animate-pop-in">
              <div className="preserve-3d flex flex-col items-center justify-center animate-spin-cake-3d">
                <div className="flex items-end justify-center gap-5 -mb-2 relative z-20">
                  {[0, 1, 2, 3, 4].map((candleIdx) => (
                    <div key={candleIdx} className="flex flex-col items-center">
                      {candlesLit && (
                        <div className="relative flex items-center justify-center mb-0.5">
                          <div className="w-6 h-6 rounded-full bg-amber-300/60 blur-xs absolute animate-pulse" />
                          <div className="w-3 h-5 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-candle shadow-[0_0_14px_#fbbf24]" />
                        </div>
                      )}
                      <div className="w-2.5 h-10 rounded-t-sm bg-gradient-to-b from-white via-pink-200 to-rose-400 border border-pink-300 shadow-xs" />
                    </div>
                  ))}
                </div>

                {renderCakeTier(74, 42, 68, 12, 'z-10')}
                {renderCakeTier(108, 60, 78, 12, '-mt-1 z-10')}
                {renderCakeTier(142, 78, 86, 12, '-mt-1 z-10')}
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full overflow-hidden">
              {floatingBubbles.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playPopSound();
                    setActiveBubblePhoto(b.photo);
                  }}
                  style={{
                    left: `${b.left}%`,
                    width: b.size,
                    height: b.size,
                    animationDuration: `${b.duration}s`,
                    animationDelay: `${b.delay}s`,
                  }}
                  aria-label={`Bong bóng ảnh: ${b.photo.caption}`}
                  className="absolute rounded-full p-1 bg-white/85 shadow-[0_10px_28px_rgba(236,64,122,0.35)] border-2 border-white hover:scale-125 transition-transform overflow-hidden cursor-pointer animate-float-up"
                >
                  <img
                    src={b.photo.src}
                    alt={b.photo.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover"
                    style={{ objectPosition: b.photo.objectPosition }}
                  />
                </button>
              ))}

              {floatingPills.map((pill) => (
                <div
                  key={pill.id}
                  style={{
                    left: `${pill.left}%`,
                    animationDuration: `${pill.duration}s`,
                    animationDelay: `${pill.delay}s`,
                  }}
                  className="absolute pointer-events-none bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-md border border-pink-300 text-xs font-bold text-rose-600 whitespace-nowrap animate-float-up"
                >
                  {pill.text}
                </div>
              ))}
            </div>
          )}

          {/* Tap Bursts */}
          {tapBursts.map((burst) => (
            <div
              key={burst.id}
              style={{ left: burst.x, top: burst.y }}
              className="absolute z-30 pointer-events-none flex flex-col items-center animate-burst-up"
            >
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 drop-shadow-sm" />
              <span className="bg-white/95 text-rose-600 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap mt-1">
                {burst.text}
              </span>
            </div>
          ))}

          {/* Selected Bubble Photo Quick Card */}
          {activeBubblePhoto && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative z-40 bg-white p-4 rounded-3xl shadow-2xl border-2 border-pink-300 max-w-[280px] text-center animate-pop-in"
            >
              <button
                type="button"
                onClick={() => setActiveBubblePhoto(null)}
                aria-label="Đóng ảnh kỷ niệm"
                className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-pink-100 mb-2.5">
                <img
                  src={activeBubblePhoto.src}
                  alt={activeBubblePhoto.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: activeBubblePhoto.objectPosition }}
                />
              </div>
              <p className="text-sm font-bold text-rose-600">
                {activeBubblePhoto.caption}
              </p>
              <p className="text-xs text-pink-700 mt-1">
                {activeBubblePhoto.note}
              </p>
            </div>
          )}
        </div>

        <div className="relative z-30 pb-4 pt-1 text-center pointer-events-none">
          <p className="text-base sm:text-lg font-bold text-rose-600 font-script drop-shadow-2xs">
            {scene === 'cake'
              ? 'Hãy chạm vào màn hình để bung tỏa bong bóng tình yêu cho Mi ✨'
              : 'Hãy chạm vào bong bóng ảnh của Mi hoặc màn hình để thả tim nha 💕'}
          </p>
        </div>
      </div>
    </div>
  );
};

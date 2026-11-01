import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Grid, Heart, Sparkles } from 'lucide-react';
import { MI_PHOTOS } from '../utils/giftData';
import { playPopSound } from '../utils/soundEffects';

interface ImageModalProps {
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: 18 + ((i * 37) % 64),
        size: 18 + (i % 4) * 8,
        duration: 4.5 + (i % 5) * 0.8,
        delay: (i % 7) * 0.45,
        type: i % 3 === 0 ? 'flower' : 'heart',
        color:
          i % 3 === 0
            ? '#f48fb1'
            : i % 2 === 0
            ? '#ff4081'
            : '#ff80ab',
      })),
    []
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev - 1 + MI_PHOTOS.length) % MI_PHOTOS.length
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % MI_PHOTOS.length
    );
  };

  const activePhoto = selectedIndex !== null ? MI_PHOTOS[selectedIndex] : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-pink-950/55 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={() => {
        if (selectedIndex !== null) {
          setSelectedIndex(null);
        } else {
          onClose();
        }
      }}
    >
      {selectedIndex === null ? (
        <div
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
          className="w-full max-w-[660px] max-h-[90vh] overflow-y-auto cute-scrollbar bg-[#fff5f8] rounded-[30px] p-4 sm:p-6 shadow-[0_24px_65px_rgba(233,30,99,0.3)] border-2 border-pink-300 relative animate-pop-in"
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-pink-200">
            <div>
              <h2
                id="gallery-modal-title"
                className="text-base sm:text-lg font-bold text-rose-600 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>ALBUM ẢNH XINH CỦA MI YÊU</span>
              </h2>
              <p className="text-xs text-pink-600 mt-0.5">
                Chạm vào bất kỳ tấm ảnh nào của Mi để ngắm cận cảnh nha 💕
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                onClose();
              }}
              aria-label="Đóng album ảnh"
              className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            {MI_PHOTOS.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => {
                  playPopSound();
                  setSelectedIndex(index);
                }}
                aria-label={`Xem ảnh: ${photo.caption}`}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-pink-100 border-2 border-pink-300 hover:border-rose-500 shadow-sm hover:shadow-lg transition-all cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  style={{
                    objectPosition: photo.objectPosition,
                    transform: photo.scale ? `scale(${photo.scale})` : undefined,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2 opacity-95 group-hover:opacity-100 transition-opacity">
                  <p className="text-[11px] font-medium text-white truncate text-left">
                    {photo.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh Polaroid của Mi"
          className="relative w-full max-w-[520px] flex flex-col items-center justify-center py-6 px-4 animate-pop-in"
        >
          {/* Floating Hearts & Flowers rising from the Polaroid */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {floatingHearts.map((item) => (
              <div
                key={item.id}
                style={{
                  left: `${item.left}%`,
                  animationDuration: `${item.duration}s`,
                  animationDelay: `${item.delay}s`,
                }}
                className="absolute animate-float-up"
              >
                {item.type === 'heart' ? (
                  <Heart
                    style={{ width: item.size, height: item.size, color: item.color }}
                    className="fill-current drop-shadow-md"
                  />
                ) : (
                  <span style={{ fontSize: item.size }} className="drop-shadow-sm">
                    🌸
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Top Action Buttons */}
          <div className="relative z-20 w-full flex items-center justify-between mb-3 px-2">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setSelectedIndex(null);
              }}
              className="py-2 px-3.5 rounded-full bg-white/90 hover:bg-white text-rose-600 text-xs font-bold shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Grid className="w-4 h-4" />
              <span>Xem lưới 9 ảnh</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                onClose();
              }}
              aria-label="Đóng trình xem ảnh"
              className="w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Polaroid Card + Left/Right Arrows */}
          <div className="relative z-10 w-full flex items-center justify-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Ảnh trước"
              className="w-11 h-11 rounded-full bg-white/90 hover:bg-white text-rose-600 shadow-lg flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {activePhoto && (
              <div
                key={activePhoto.id}
                className="bg-white p-3.5 sm:p-4 pb-6 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.45)] border-2 border-pink-200 w-full max-w-[330px] text-center relative animate-pop-in"
              >
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-pink-100 relative">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: activePhoto.objectPosition,
                      transform: activePhoto.scale
                        ? `scale(${activePhoto.scale})`
                        : undefined,
                    }}
                  />
                </div>

                <p className="mt-3.5 text-base font-bold text-rose-600">
                  {activePhoto.caption}
                </p>
                <p className="mt-1 text-xs text-pink-700 leading-relaxed px-1">
                  {activePhoto.note}
                </p>
                <p className="mt-1.5 text-[11px] font-medium text-pink-400">
                  {activePhoto.dateTag} · {selectedIndex + 1}/{MI_PHOTOS.length}
                </p>

                <div className="-bottom-4 left-1/2 -translate-x-1/2 absolute w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md border-2 border-white animate-pulse-heart">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleNext}
              aria-label="Ảnh tiếp theo"
              className="w-11 h-11 rounded-full bg-white/90 hover:bg-white text-rose-600 shadow-lg flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

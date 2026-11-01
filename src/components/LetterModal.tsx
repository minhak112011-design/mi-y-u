import React, { useState, useEffect } from 'react';
import { Heart, X, Sparkles, CheckCheck, RotateCcw } from 'lucide-react';
import {
  LOVE_LETTER_TITLE,
  LOVE_LETTER_PARAGRAPHS,
  LOVE_LETTER_SIGNATURE,
} from '../utils/giftData';
import { playEnvelopeOpenSound, playPopSound } from '../utils/soundEffects';

interface LetterModalProps {
  onClose: () => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({ onClose }) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);
  const [isLetterVisible, setIsLetterVisible] = useState<boolean>(false);
  const [charCount, setCharCount] = useState<number>(0);

  const fullText = LOVE_LETTER_PARAGRAPHS.join('\n\n');

  const handleOpenEnvelope = () => {
    if (isEnvelopeOpen) return;
    playEnvelopeOpenSound();
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setIsLetterVisible(true);
    }, 550);
  };

  useEffect(() => {
    if (!isLetterVisible) return;
    if (charCount >= fullText.length) return;

    const timer = setTimeout(() => {
      setCharCount((prev) => Math.min(prev + 18, fullText.length));
    }, 55);

    return () => clearTimeout(timer);
  }, [isLetterVisible, charCount, fullText.length]);

  const displayedText = fullText.slice(0, charCount);
  const displayedParagraphs = displayedText.split('\n\n');
  const isFinishedTyping = charCount >= fullText.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-pink-950/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {!isLetterVisible ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col items-center animate-pop-in"
        >
          <button
            type="button"
            onClick={handleOpenEnvelope}
            aria-label="Mở bức thư gửi Mi"
            className="group relative w-[300px] sm:w-[360px] h-[210px] sm:h-[240px] rounded-2xl bg-gradient-to-b from-pink-300 to-pink-400 shadow-[0_25px_60px_rgba(233,30,99,0.4)] border-2 border-white/80 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-98 overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 50%), linear-gradient(225deg, rgba(255,255,255,0.28) 0%, transparent 50%)',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-2/3 bg-pink-300/90 border-t border-white/50 pointer-events-none"
              style={{
                clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)',
              }}
            />

            <div
              style={{
                transformOrigin: 'top center',
                clipPath: 'polygon(0 0, 50% 62%, 100% 0)',
                transform: isEnvelopeOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              }}
              className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-rose-400 to-pink-400 border-b border-white/60 z-10 pointer-events-none transition-transform duration-500"
            />

            <div className="relative z-20 flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl border-2 border-pink-200 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-rose-500 fill-rose-500 animate-pulse-heart" />
              <span className="text-[11px] font-bold text-rose-600 mt-0.5">
                Mở thư
              </span>
            </div>
          </button>

          <p className="mt-4 text-sm font-semibold text-white drop-shadow-xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-pink-200" />
            <span>Chạm vào phong bì để mở tâm thư gửi Mi nha 💕</span>
          </p>
        </div>
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-modal-title"
          className="w-full max-w-[540px] max-h-[88vh] flex flex-col bg-[#fff9fb] rounded-[30px] p-5 sm:p-7 shadow-[0_25px_70px_rgba(136,14,79,0.45)] border-2 border-pink-300 relative overflow-hidden animate-pop-in"
        >
          <div className="absolute -top-4 -left-4 text-4xl opacity-80 pointer-events-none select-none">
            🌸
          </div>
          <div className="absolute top-12 right-6 text-xl opacity-40 pointer-events-none select-none">
            🌷
          </div>
          <div className="absolute bottom-4 right-5 text-3xl opacity-85 pointer-events-none select-none">
            🐰💗
          </div>

          <button
            type="button"
            id="close-letter"
            onClick={() => {
              playPopSound();
              onClose();
            }}
            aria-label="Đóng tâm thư"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="pr-10 pb-3 mb-3 border-b border-pink-200/80">
            <h2
              id="letter-modal-title"
              className="text-xl sm:text-2xl font-bold text-rose-600 font-script leading-snug"
            >
              {LOVE_LETTER_TITLE}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto cute-scrollbar pr-2 space-y-3.5 text-sm sm:text-base text-pink-950/90 leading-relaxed">
            {displayedParagraphs.map((para, idx) => (
              <p key={idx} className="font-medium">
                {para}
              </p>
            ))}

            {isFinishedTyping && (
              <div className="pt-3 text-right pr-8 animate-pop-in">
                <p className="text-xl font-bold text-rose-600 font-script">
                  {LOVE_LETTER_SIGNATURE}
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-pink-200/70 flex items-center justify-between gap-2">
            {!isFinishedTyping ? (
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setCharCount(fullText.length);
                }}
                className="py-2 px-3.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Hiện toàn bộ thư ngay</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setCharCount(0);
                }}
                className="py-2 px-3.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đọc lại hiệu ứng viết thư</span>
              </button>
            )}

            <span className="text-xs text-pink-500 font-medium">
              Dành riêng cho Mi yêu ✨
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

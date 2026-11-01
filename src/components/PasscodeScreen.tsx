import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Delete, Gift, Sparkles, X, RefreshCw } from 'lucide-react';
import {
  PASSCODE_HINTS,
  MAX_PASSCODE_LENGTH,
  MI_PHOTOS,
  appendDigit,
  removeDigit,
  validatePasscode,
  getNextHintIndex,
} from '../utils/giftData';
import {
  playPopSound,
  playUnlockSparkleSound,
  playErrorBuzzSound,
} from '../utils/soundEffects';

interface PasscodeScreenProps {
  onUnlockSuccess: () => void;
}

export const PasscodeScreen: React.FC<PasscodeScreenProps> = ({ onUnlockSuccess }) => {
  const [passcode, setPasscode] = useState<string>('');
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [isHintRevealed, setIsHintRevealed] = useState<boolean>(false);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState<number>(0);

  const handleDigitPress = useCallback(
    (digit: string) => {
      playPopSound();
      setIsWrong(false);
      setErrorMessage('');

      setPasscode((prev) => {
        const next = appendDigit(prev, digit);
        if (next.length === MAX_PASSCODE_LENGTH && prev.length < MAX_PASSCODE_LENGTH) {
          if (validatePasscode(next)) {
            playUnlockSparkleSound();
            setTimeout(() => {
              onUnlockSuccess();
            }, 180);
          } else {
            playErrorBuzzSound();
            setIsWrong(true);
            setErrorMessage('Ủa sai mật khẩu rùi công chúa Mi ơi! Bấm nút hộp quà 🎁 để coi gợi ý nha!');
            setTimeout(() => {
              setPasscode('');
              setIsWrong(false);
            }, 650);
          }
        }
        return next;
      });
    },
    [onUnlockSuccess]
  );

  const handleBackspace = useCallback(() => {
    playPopSound();
    setIsWrong(false);
    setErrorMessage('');
    setPasscode((prev) => removeDigit(prev));
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (showHintModal) {
        if (e.key === 'Escape') setShowHintModal(false);
        return;
      }
      if (/^[0-9]$/.test(e.key)) {
        handleDigitPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleDigitPress, handleBackspace, showHintModal]);

  const currentHint = PASSCODE_HINTS[hintIndex];
  const currentCoverPhoto = MI_PHOTOS[coverPhotoIndex % 3];

  const handleQuickFill = () => {
    playUnlockSparkleSound();
    setShowHintModal(false);
    setPasscode('1111');
    setTimeout(() => {
      onUnlockSuccess();
    }, 220);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-6 pb-24 relative z-10">
      {/* Cute Top Greeting Banner for Mi */}
      <div className="text-center mb-4 md:mb-6 animate-pop-in">
        <p className="text-xs md:text-sm font-semibold text-pink-600 tracking-wide">
          Thế Giới Nhỏ Dành Riêng Cho Người Anh Yêu 💕
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-pink-900 mt-0.5 font-script">
          Gửi Em Bé Mi Siêu Cấp Dễ Thương
        </h1>
      </div>

      {/* Main Lock Card matching the video layout */}
      <div
        className={`w-full max-w-[760px] bg-[#fff5f8]/95 backdrop-blur-md rounded-[32px] p-5 sm:p-8 shadow-[0_20px_60px_rgba(233,30,99,0.18)] border-2 border-pink-300/90 relative animate-pop-in ${
          isWrong ? 'animate-shake border-rose-500' : ''
        }`}
      >
        <div className="rounded-[24px] border border-pink-200/90 p-3.5 sm:p-6 bg-gradient-to-br from-white/90 via-pink-50/60 to-pink-100/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
            {/* Left Column: Mi's Polaroid Photo Frame */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div className="relative group w-full max-w-[195px] sm:max-w-[270px]">
                <div className="absolute -top-2.5 -right-2.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-md animate-pulse-heart">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setCoverPhotoIndex((prev) => (prev + 1) % 3);
                  }}
                  aria-label="Đổi ảnh đại diện của Mi"
                  className="w-full bg-white p-2.5 sm:p-3.5 pb-3.5 sm:pb-5 rounded-2xl shadow-[0_10px_30px_rgba(236,64,122,0.16)] border border-pink-200 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] text-center cursor-pointer"
                >
                  <div className="w-full aspect-square sm:aspect-[4/5] rounded-xl overflow-hidden bg-pink-100 relative">
                    <img
                      src={currentCoverPhoto.src}
                      alt={currentCoverPhoto.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-all duration-300"
                      style={{
                        objectPosition: currentCoverPhoto.objectPosition,
                      }}
                    />
                    <div className="absolute bottom-1.5 right-1.5 bg-black/45 backdrop-blur-xs text-white text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <RefreshCw className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>Đổi ảnh Mi</span>
                    </div>
                  </div>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-bold text-pink-800 truncate">
                    {currentCoverPhoto.caption}
                  </p>
                  <p className="text-[11px] sm:text-xs text-pink-500 mt-0.5">
                    Công chúa nhỏ của anh ✨
                  </p>
                </button>
              </div>
            </div>

            {/* Right Column: Heart, 4 Dots & Numeric Keypad */}
            <div className="md:col-span-6 flex flex-col items-center justify-center">
              <div className="mb-3 flex flex-col items-center">
                <Heart className="w-9 h-9 text-rose-500 fill-rose-500 animate-pulse-heart drop-shadow-xs" />
                <span className="text-xs font-medium text-pink-600 mt-1">
                  Nhập mật khẩu tình yêu của Mi
                </span>
              </div>

              {/* 4 Passcode Dots */}
              <div
                className="flex items-center justify-center gap-3.5 mb-5"
                aria-label={`Đã nhập ${passcode.length} trên 4 số`}
              >
                {Array.from({ length: MAX_PASSCODE_LENGTH }).map((_, index) => {
                  const isFilled = index < passcode.length;
                  return (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full transition-all duration-200 border-2 ${
                        isFilled
                          ? 'bg-rose-500 border-rose-500 scale-110 shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                          : 'bg-transparent border-rose-400'
                      }`}
                    />
                  );
                })}
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="text-xs text-rose-600 font-medium text-center mb-3 px-2"
                >
                  {errorMessage}
                </p>
              )}

              {/* Keypad Grid 1-9 + [Hint, 0, Backspace] */}
              <div className="grid grid-cols-3 gap-x-6 gap-y-3 w-full max-w-[240px] place-items-center">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handleDigitPress(digit)}
                    aria-label={`Số ${digit}`}
                    className="w-14 h-12 rounded-2xl text-xl font-bold text-rose-600 hover:bg-pink-200/70 active:bg-pink-300/80 active:scale-95 transition-all flex items-center justify-center cursor-pointer select-none"
                  >
                    {digit}
                  </button>
                ))}

                {/* Bottom Left: Hint Gift/Lock Button matching video */}
                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setShowHintModal(true);
                  }}
                  aria-label="Gợi ý mật khẩu"
                  className="w-14 h-12 rounded-2xl bg-pink-200/80 hover:bg-pink-300/90 text-rose-600 active:scale-95 transition-all flex items-center justify-center shadow-xs relative cursor-pointer"
                  title="Bấm xem gợi ý mật khẩu"
                >
                  <Gift className="w-5 h-5 text-rose-600" />
                  <span className="sr-only">Gợi ý mật khẩu</span>
                </button>

                {/* Bottom Center: Digit 0 */}
                <button
                  type="button"
                  onClick={() => handleDigitPress('0')}
                  aria-label="Số 0"
                  className="w-14 h-12 rounded-2xl text-xl font-bold text-rose-600 hover:bg-pink-200/70 active:bg-pink-300/80 active:scale-95 transition-all flex items-center justify-center cursor-pointer select-none"
                >
                  0
                </button>

                {/* Bottom Right: Backspace Button */}
                <button
                  type="button"
                  onClick={handleBackspace}
                  aria-label="Xóa số vừa nhập"
                  className="w-14 h-12 rounded-2xl text-rose-600 hover:bg-pink-200/70 active:bg-pink-300/80 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setShowHintModal(true);
                }}
                className="mt-4 text-xs font-semibold text-pink-600 hover:text-rose-600 underline underline-offset-4 flex items-center gap-1.5 py-1.5 px-3 rounded-lg cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mi quên mật khẩu hả? Bấm vô đây xem gợi ý nè!</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hint Modal matching 00:01 - 00:02 in the reference video */}
      {showHintModal && (
        <div
          className="fixed inset-0 z-50 bg-pink-950/45 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowHintModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hint-modal-title"
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-2 border-pink-300 text-center relative animate-pop-in"
          >
            <button
              type="button"
              onClick={() => setShowHintModal(false)}
              aria-label="Đóng gợi ý"
              className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center justify-center gap-2 text-rose-600 font-bold text-base mb-3">
              <Gift className="w-5 h-5" />
              <h2 id="hint-modal-title">Gợi ý mật khẩu cho Mi</h2>
            </div>

            <p className="text-xs text-pink-800/90 leading-relaxed mb-4 px-1">
              {currentHint.clue}
            </p>

            {!isHintRevealed ? (
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setIsHintRevealed(true);
                }}
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm shadow-md shadow-rose-500/25 active:scale-98 transition-all cursor-pointer"
              >
                Bấm để xem mật khẩu bí mật
              </button>
            ) : (
              <div className="space-y-3 animate-pop-in">
                <div className="py-3 px-4 rounded-2xl bg-pink-50 border-2 border-pink-300">
                  <p className="text-[11px] font-medium text-pink-500 mb-0.5">
                    Mật khẩu mở trái tim anh là:
                  </p>
                  <p className="text-2xl font-extrabold tracking-[0.35em] text-rose-600 pl-2">
                    {currentHint.codeDisplay}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setHintIndex((prev) => getNextHintIndex(prev));
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Xem thêm gợi ý khác ({hintIndex + 1}/{PASSCODE_HINTS.length})
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickFill}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    Mở khóa 1111 luôn
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

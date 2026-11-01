/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Heart,
  Play,
  Pause,
  SkipForward,
  Lock,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  SONGS,
  getNextTrackIndex,
  getPrevTrackIndex,
} from './utils/giftData';
import { playPopSound } from './utils/soundEffects';
import { PasscodeScreen } from './components/PasscodeScreen';
import { FlowerBurstOverlay } from './components/FlowerBurstOverlay';
import { MusicModal } from './components/MusicModal';
import { ImageModal } from './components/ImageModal';
import { LetterModal } from './components/LetterModal';
import { GiftModal } from './components/GiftModal';

type ActiveModal = 'music' | 'letter' | 'image' | 'gift' | null;

const CuteMusicSvg = () => (
  <svg width="68" height="68" viewBox="0 0 80 80" className="drop-shadow-xs">
    <circle cx="38" cy="44" r="24" fill="#37474f" stroke="#ec407a" strokeWidth="3" />
    <circle cx="38" cy="44" r="16" fill="none" stroke="#90a4ae" strokeWidth="1.5" strokeDasharray="4 4" />
    <circle cx="38" cy="44" r="8" fill="#f48fb1" stroke="#fff" strokeWidth="2" />
    <circle cx="38" cy="44" r="2.5" fill="#fff" />
    <path
      d="M52 18V40C52 43.5 48.5 46 45 45C41.5 44 40 40.5 42 37.5C43.5 35.5 46.5 35 48.5 36V22L62 19V35C62 38.5 58.5 41 55 40C51.5 39 50 35.5 52 32.5"
      fill="none"
      stroke="#ff4081"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 22C20 19 24 19 24 22C24 19 28 19 28 22C28 25.5 24 28 24 28C24 28 20 25.5 20 22Z"
      fill="#ff4081"
    />
  </svg>
);

const CuteLetterSvg = () => (
  <svg width="68" height="68" viewBox="0 0 80 80" className="drop-shadow-xs">
    <rect
      x="16"
      y="20"
      width="48"
      height="42"
      rx="6"
      fill="#fff"
      stroke="#ec407a"
      strokeWidth="3"
    />
    <line x1="24" y1="30" x2="46" y2="30" stroke="#f48fb1" strokeWidth="3" strokeLinecap="round" />
    <line x1="24" y1="38" x2="54" y2="38" stroke="#f48fb1" strokeWidth="3" strokeLinecap="round" />
    <line x1="24" y1="46" x2="40" y2="46" stroke="#f48fb1" strokeWidth="3" strokeLinecap="round" />
    <path
      d="M48 47C48 44 52.5 44 52.5 47C52.5 44 57 44 57 47C57 51 52.5 54.5 52.5 54.5C52.5 54.5 48 51 48 47Z"
      fill="#ff4081"
    />
  </svg>
);

const CuteImageSvg = () => (
  <svg width="68" height="68" viewBox="0 0 80 80" className="drop-shadow-xs">
    <rect
      x="14"
      y="22"
      width="52"
      height="40"
      rx="7"
      fill="#fff"
      stroke="#ec407a"
      strokeWidth="3"
    />
    <path d="M40 22L30 14M40 22L50 14" stroke="#ec407a" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="40" cy="14" r="3" fill="#ff4081" />
    <circle cx="28" cy="34" r="5" fill="#ffd54f" />
    <path
      d="M17 56L31 41L42 51L51 43L63 56H17Z"
      fill="#81c784"
      stroke="#ec407a"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const CuteGiftSvg = () => (
  <svg width="68" height="68" viewBox="0 0 80 80" className="drop-shadow-xs">
    <rect
      x="20"
      y="36"
      width="40"
      height="28"
      rx="4"
      fill="#fff59d"
      stroke="#ec407a"
      strokeWidth="3"
    />
    <rect
      x="16"
      y="28"
      width="48"
      height="10"
      rx="3"
      fill="#ff80ab"
      stroke="#ec407a"
      strokeWidth="3"
    />
    <rect x="36" y="28" width="8" height="36" fill="#ff4081" />
    <path
      d="M32 19C32 16.5 35.5 16.5 35.5 19C35.5 16.5 39 16.5 39 19C39 22 35.5 25 35.5 25C35.5 25 32 22 32 19Z"
      fill="#ff4081"
    />
    <path
      d="M45 15C45 13 48 13 48 15C48 13 51 13 51 15C51 17.5 48 20 48 20C48 20 45 17.5 45 15Z"
      fill="#f06292"
    />
  </svg>
);

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });

  const [burstStage, setBurstStage] = useState<'none' | 'heart' | 'fullscreen'>('none');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = SONGS[currentTrackIndex] || SONGS[0];

  const startPlaybackSafely = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, []);

  const handleUnlockSuccess = useCallback(() => {
    setBurstStage('heart');
    startPlaybackSafely();

    setTimeout(() => {
      setBurstStage('fullscreen');
    }, 850);

    setTimeout(() => {
      setIsUnlocked(true);
      setBurstStage('none');
    }, 1950);
  }, [startPlaybackSafely]);

  const handleTogglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleSelectTrack = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }, 60);
  }, []);

  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => getNextTrackIndex(prev));
    setCurrentTime(0);
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }, 60);
  }, []);

  const handlePrevTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => getPrevTrackIndex(prev));
    setCurrentTime(0);
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }, 60);
  }, []);

  const handleSeek = useCallback((newTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = isMuted;
  }, [isMuted]);

  const menuCards = [
    {
      id: 'music' as const,
      title: 'Music',
      vnSubtitle: 'Nhạc tặng Mi yêu ♪',
      icon: <CuteMusicSvg />,
    },
    {
      id: 'letter' as const,
      title: 'Letter',
      vnSubtitle: 'Tâm thư gửi Mi 💌',
      icon: <CuteLetterSvg />,
    },
    {
      id: 'image' as const,
      title: 'Image',
      vnSubtitle: 'Album ảnh của Mi 📸',
      icon: <CuteImageSvg />,
    },
    {
      id: 'gift' as const,
      title: 'Gift',
      vnSubtitle: 'Món quà 3D bất ngờ 🎁',
      icon: <CuteGiftSvg />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fce4ec] via-[#f8bbd0] to-[#fce4ec] relative overflow-x-hidden flex flex-col justify-between">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={handleNextTrack}
      />

      {/* Ambient Floating Background Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[12, 28, 46, 65, 82, 91].map((leftPos, idx) => (
          <div
            key={idx}
            style={{
              left: `${leftPos}%`,
              top: `${15 + ((idx * 23) % 70)}%`,
              animationDelay: `${idx * 0.7}s`,
            }}
            className="absolute animate-float-slow opacity-30 text-pink-400"
          >
            <Heart className="w-6 h-6 fill-current" />
          </div>
        ))}
      </div>

      {burstStage !== 'none' && <FlowerBurstOverlay stage={burstStage} />}

      {!isUnlocked ? (
        <PasscodeScreen onUnlockSuccess={handleUnlockSuccess} />
      ) : (
        <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 pt-6 pb-28 flex flex-col items-center justify-center">
          <div className="w-full max-w-[720px] flex items-center justify-between gap-4 mb-6 bg-white/80 backdrop-blur-md px-5 py-3.5 rounded-3xl border border-pink-200 shadow-sm animate-pop-in">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-rose-600 font-bold text-sm sm:text-base">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span className="truncate">Thế Giới Của Công Chúa Mi 💕</span>
              </div>
              <p className="text-xs text-pink-600 truncate mt-0.5">
                “Okay Mi là nhất ở nơi đông người — I will never lose you!”
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                setActiveModal(null);
                setIsUnlocked(false);
              }}
              aria-label="Khóa lại màn hình mật khẩu"
              className="py-2 px-3.5 rounded-2xl bg-pink-100 hover:bg-pink-200 text-rose-600 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Khóa 1111</span>
            </button>
          </div>

          {/* 2x2 Menu Grid matching 00:07 - 00:08 in the reference video on both mobile and desktop */}
          <div className="w-full max-w-[720px] grid grid-cols-2 gap-3 sm:gap-6">
            {menuCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => {
                  playPopSound();
                  setActiveModal(card.id);
                }}
                aria-label={`${card.title} - ${card.vnSubtitle}`}
                className="group bg-[#fff5f8]/95 hover:bg-white rounded-[24px] sm:rounded-[28px] p-2.5 sm:p-3.5 shadow-[0_14px_35px_rgba(233,30,99,0.15)] hover:shadow-[0_18px_45px_rgba(233,30,99,0.26)] border-2 border-pink-300/90 hover:border-rose-400 transition-all duration-200 hover:-translate-y-1 active:scale-98 cursor-pointer text-center animate-pop-in"
              >
                <div className="w-full h-full rounded-[18px] sm:rounded-[20px] border border-pink-200 bg-gradient-to-b from-white/90 to-pink-50/60 py-4 sm:py-6 px-2 sm:px-4 flex flex-col items-center justify-center">
                  <div className="transform group-hover:scale-110 transition-transform duration-200 mb-1.5 sm:mb-2.5 scale-90 sm:scale-100">
                    {card.icon}
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-rose-600 tracking-tight">
                    {card.title}
                  </span>
                  <span className="text-[11px] sm:text-xs font-medium text-pink-600 mt-0.5 sm:mt-1">
                    {card.vnSubtitle}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* Persistent Bottom Floating Music Bar */}
      <div className="fixed bottom-3 inset-x-0 z-30 px-3 pointer-events-none flex justify-center">
        <div className="pointer-events-auto w-full max-w-[520px] bg-white/92 backdrop-blur-md border-2 border-pink-300 rounded-2xl px-3.5 py-2 shadow-lg flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              if (isUnlocked) {
                setActiveModal('music');
              } else {
                handleTogglePlay();
              }
            }}
            className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-pink-300 shrink-0 relative">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                style={{ objectPosition: currentTrack.coverPosition || '50% 50%' }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-rose-600 truncate">
                {currentTrack.title}
              </p>
              <p className="text-[11px] text-pink-500 truncate">
                {isPlaying ? 'Đang phát nhạc cho Mi ♪' : 'Chạm để bật nhạc nền cho Mi'}
              </p>
            </div>
          </button>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                handleTogglePlay();
              }}
              aria-label={isPlaying ? 'Tạm dừng nhạc nền' : 'Phát nhạc nền'}
              className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                handleNextTrack();
              }}
              aria-label="Đổi bài nhạc khác"
              className="w-9 h-9 rounded-full bg-pink-100 hover:bg-pink-200 text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            <button
              type="button"
              onClick={() => setIsMuted((prev) => !prev)}
              aria-label={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
              className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Active Modals */}
      {activeModal === 'music' && (
        <MusicModal
          currentTrackIndex={currentTrackIndex}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          onSelectTrack={handleSelectTrack}
          onTogglePlay={handleTogglePlay}
          onPrevTrack={handlePrevTrack}
          onNextTrack={handleNextTrack}
          onSeek={handleSeek}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'image' && (
        <ImageModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'letter' && (
        <LetterModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'gift' && (
        <GiftModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}

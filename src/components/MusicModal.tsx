import React, { useState } from 'react';
import {
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
  Film,
  Image as ImageIcon,
  Heart,
} from 'lucide-react';
import { SONGS, SongTrack, formatTime } from '../utils/giftData';
import { playPopSound } from '../utils/soundEffects';

interface MusicModalProps {
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onSelectTrack: (index: number) => void;
  onTogglePlay: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  onSeek: (time: number) => void;
  onClose: () => void;
}

export const MusicModal: React.FC<MusicModalProps> = ({
  currentTrackIndex,
  isPlaying,
  currentTime,
  duration,
  onSelectTrack,
  onTogglePlay,
  onPrevTrack,
  onNextTrack,
  onSeek,
  onClose,
}) => {
  const [showMvPreview, setShowMvPreview] = useState<boolean>(false);
  const currentTrack: SongTrack = SONGS[currentTrackIndex] || SONGS[0];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = Number(e.target.value);
    onSeek(nextVal);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-pink-950/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="music-modal-title"
        className="w-full max-w-[780px] max-h-[92vh] overflow-y-auto cute-scrollbar bg-[#fff5f8] rounded-[30px] p-4 sm:p-7 shadow-[0_24px_65px_rgba(233,30,99,0.28)] border-2 border-pink-300 relative animate-pop-in"
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-pink-200">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-base sm:text-lg">
            <Music className="w-5 h-5" />
            <h2 id="music-modal-title">MUSIC PLAYER — NHẠC TẶNG MI</h2>
          </div>

          <button
            type="button"
            onClick={() => {
              playPopSound();
              onClose();
            }}
            aria-label="Đóng trình phát nhạc"
            className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left Player Column */}
          <div className="md:col-span-5 bg-white/90 rounded-2xl p-4 border border-pink-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-full max-w-[210px] aspect-square rounded-2xl overflow-hidden bg-pink-100 border-2 border-pink-200 shadow-md relative mb-3">
              {showMvPreview ? (
                <video
                  key={currentTrack.src}
                  src={currentTrack.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isPlaying ? 'scale-105' : 'scale-100'
                  }`}
                  style={{ objectPosition: currentTrack.coverPosition || '50% 50%' }}
                />
              )}

              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setShowMvPreview((prev) => !prev);
                }}
                className="absolute bottom-2 right-2 bg-black/55 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1 hover:bg-black/70 transition-colors cursor-pointer"
              >
                {showMvPreview ? (
                  <>
                    <ImageIcon className="w-3 h-3" />
                    <span>Ảnh Mi</span>
                  </>
                ) : (
                  <>
                    <Film className="w-3 h-3" />
                    <span>Xem MV</span>
                  </>
                )}
              </button>
            </div>

            <h3 className="text-base font-bold text-rose-600 line-clamp-1">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-pink-600 mt-0.5 line-clamp-2">
              {currentTrack.dedication}
            </p>

            {/* Scrubber Bar */}
            <div className="w-full mt-3 space-y-1">
              <input
                type="range"
                min={0}
                max={duration > 0 ? duration : 30}
                step={0.1}
                value={Math.min(currentTime, duration > 0 ? duration : 30)}
                onChange={handleSliderChange}
                aria-label="Thanh tua nhạc"
                className="w-full accent-rose-500 h-1.5 bg-pink-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-medium text-pink-500 tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration > 0 ? duration : 25)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  onPrevTrack();
                }}
                aria-label="Bài trước"
                className="w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>

              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  onTogglePlay();
                }}
                aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white flex items-center justify-center shadow-md shadow-rose-500/30 active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  onNextTrack();
                }}
                aria-label="Bài tiếp theo"
                className="w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Right Playlist & Lyrics Column */}
          <div className="md:col-span-7 flex flex-col gap-3">
            <div className="space-y-2.5 max-h-[250px] overflow-y-auto cute-scrollbar pr-1">
              {SONGS.map((track, idx) => {
                const isSelected = idx === currentTrackIndex;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => {
                      playPopSound();
                      onSelectTrack(idx);
                    }}
                    className={`w-full flex items-center gap-3.5 p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-200/90 to-rose-100/90 border-rose-400 shadow-xs'
                        : 'bg-white/80 hover:bg-pink-50 border-pink-200'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-pink-300 relative">
                      <img
                        src={track.cover}
                        alt={track.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: track.coverPosition || '50% 50%' }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-bold truncate ${
                          isSelected ? 'text-rose-700' : 'text-pink-900'
                        }`}
                      >
                        {track.title}
                      </p>
                      <p className="text-xs text-pink-600 truncate mt-0.5">
                        {track.subtitle}
                      </p>
                    </div>
                    <div className="shrink-0 pr-1">
                      {isSelected && isPlaying ? (
                        <span className="text-xs font-semibold text-rose-600">
                          Đang phát ♪
                        </span>
                      ) : (
                        <Heart
                          className={`w-4 h-4 ${
                            isSelected
                              ? 'text-rose-500 fill-rose-500'
                              : 'text-pink-300'
                          }`}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-white/90 rounded-2xl p-3.5 border border-pink-200 shadow-2xs">
              <p className="text-xs font-bold text-rose-600 mb-1.5">
                Lời bài hát nhắn gửi tới Mi 💕:
              </p>
              <div className="max-h-[115px] overflow-y-auto cute-scrollbar space-y-1 text-xs text-pink-800 leading-relaxed pr-1">
                {currentTrack.lyrics.map((line, i) => (
                  <p key={i} className="hover:text-rose-600 transition-colors">
                    “{line}”
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

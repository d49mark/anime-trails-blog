import React from 'react';
import { usePodcast } from '../context/PodcastContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function GlobalAudioPlayer() {
  const { currentEpisode, isPlaying, togglePlay, progress, duration, seek } = usePodcast();

  if (!currentEpisode) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 sm:px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          {/* Episode Info */}
          <div className="flex items-center space-x-3 w-full sm:w-1/3">
            <img src={currentEpisode.coverImage} className="w-12 h-12 rounded-lg object-cover shadow-sm" alt={currentEpisode.title} />
            <div className="min-w-0">
              <h4 className="text-sm font-serif font-bold text-black dark:text-white truncate">{currentEpisode.title}</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 truncate">{currentEpisode.author}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center w-full sm:w-1/3 space-y-1">
            <div className="flex items-center space-x-6">
              <button onClick={() => seek(Math.max(0, progress - 15))} className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-full hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
              </button>
              <button onClick={() => seek(Math.min(duration, progress + 15))} className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
            
            <div className="w-full flex items-center space-x-2">
              <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 w-8 text-right">{formatTime(progress)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={(e) => seek(Number(e.target.value))}
                className="flex-grow h-1 bg-zinc-300 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-black dark:accent-white"
              />
              <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 w-8">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume / Extra */}
          <div className="hidden sm:flex items-center justify-end w-1/3 space-x-4">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-zinc-700 dark:text-zinc-400" />
              <div className="w-24 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full">
                <div className="w-2/3 h-full bg-zinc-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

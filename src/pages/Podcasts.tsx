import React from 'react';
import { PODCAST_EPISODES } from '../data/posts';

export function Podcasts() {
  return (
    <div className="space-y-10">
      <div className="pb-4 border-b border-zinc-100 dark:border-zinc-900">
        <h1 className="text-lg font-serif font-bold uppercase tracking-wider text-black dark:text-white">Recent Episodes</h1>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
        {PODCAST_EPISODES.map((episode) => (
          <article key={episode.id} className="py-8 first:pt-0 flex flex-col sm:flex-row gap-6 items-start group">
            <div className="w-full sm:w-32 md:w-40 shrink-0 aspect-[4/3] overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative">
              <img
                src={episode.coverImage}
                alt={episode.title}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] px-1.5 py-0.5 rounded-sm font-mono">
                {episode.duration}
              </div>
            </div>
            <div className="space-y-2 flex-grow">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                <span style={{ color: 'var(--color-accent)' }}>Podcast</span>
                <span>/</span>
                <span>{episode.date}</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-black dark:text-white group-hover:text-[var(--color-accent)] transition-colors leading-snug cursor-pointer">
                {episode.title}
              </h2>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {episode.excerpt}
              </p>
              <div className="flex items-center space-x-3 pt-1">
                <button className="text-[11px] font-bold uppercase tracking-tighter hover:underline underline-offset-2" style={{ color: 'var(--color-accent)' }}>
                  Listen Now
                </button>
                <span className="text-[11px] font-medium text-zinc-400 italic">Hosted by {episode.author}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

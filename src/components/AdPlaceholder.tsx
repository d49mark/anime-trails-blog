import React from 'react';

export function AdPlaceholder({ slot }: { slot?: string }) {
  return (
    <div className="my-8 p-4 border border-zinc-100 dark:border-zinc-900 rounded flex flex-col items-center justify-center bg-zinc-50/30 dark:bg-zinc-900/30 min-h-[150px]">
      <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest mb-1">Ad</span>
      <div className="text-xs text-zinc-400">
        {slot || 'AdSense'}
      </div>
    </div>
  );
}

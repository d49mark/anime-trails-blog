import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto px-6">
      <header className="py-10 flex flex-col sm:flex-row justify-between items-center border-b border-zinc-100 dark:border-zinc-900 gap-6">
        <Link to="/" className="flex items-center space-x-4 group">
          <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center transition-all group-hover:scale-105 duration-300 shrink-0">
            <span className="font-serif text-xl font-bold text-white dark:text-black tracking-tighter">AT</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 leading-tight">
              Exploring the Psychology
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 leading-tight">
              of Anime Stories
            </span>
          </div>
        </Link>
        <nav className="flex items-center space-x-5">
          <Link to="/" className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Home</Link>
          <Link to="/blogs" className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Blogs</Link>
          <Link to="/podcasts" className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Podcasts</Link>
          <Link to="/about" className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">About</Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="flex-grow py-12">
        {children}
      </main>

      <footer className="py-12 border-t border-zinc-100 dark:border-zinc-900 text-center">
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Anime Trails. Exploring the depth of anime.
        </p>
      </footer>
    </div>
  );
}

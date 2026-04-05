import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BLOG_POSTS } from '../data/posts';
import { AdPlaceholder } from '../components/AdPlaceholder';

export function Post() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-lg font-serif font-bold mb-4 text-black dark:text-white">Entry Not Found</h1>
        <Link to="/" className="text-xs text-zinc-500 hover:underline">Back to Index</Link>
      </div>
    );
  }

  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest">
          <span style={{ color: 'var(--color-accent)' }}>{post.category}</span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-zinc-500 dark:text-zinc-400">{post.date}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-black dark:text-white leading-tight">
          {post.title}
        </h1>
        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium italic border-l-2 pl-3" style={{ borderLeftColor: 'var(--color-accent)' }}>
          Written by {post.author} • {post.readingTime}
        </div>
      </header>

      {post.coverImage && (
        <div className="max-w-xl mx-auto overflow-hidden rounded-sm border border-zinc-100 dark:border-zinc-900">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto opacity-95"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="markdown-body pt-4">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <AdPlaceholder slot="post-bottom" />

      <footer className="pt-6 border-t border-zinc-100 dark:border-zinc-900">
        <Link to="/" className="text-xs font-bold uppercase tracking-tighter hover:underline" style={{ color: 'var(--color-accent)' }}>
          ← Return to Index
        </Link>
      </footer>
    </article>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/posts';

export function Blogs() {
  return (
    <div className="space-y-10">
      <div className="pb-4 border-b border-zinc-100 dark:border-zinc-900">
        <h1 className="text-lg font-serif font-bold uppercase tracking-wider text-black dark:text-white">All Blog Entries</h1>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="py-8 first:pt-0 flex flex-col sm:flex-row gap-6 items-start">
            {post.coverImage && (
              <Link to={`/post/${post.id}`} className="w-full sm:w-32 md:w-40 shrink-0 aspect-[4/3] overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                  referrerPolicy="no-referrer"
                />
              </Link>
            )}
            <div className="space-y-2 flex-grow">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                <span style={{ color: 'var(--color-accent)' }}>{post.category}</span>
                <span>/</span>
                <span>{post.date}</span>
              </div>
              <Link to={`/post/${post.id}`} className="block group">
                <h2 className="text-lg font-serif font-bold text-black dark:text-white group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                  {post.title}
                </h2>
              </Link>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
              <Link to={`/post/${post.id}`} className="inline-block text-[11px] font-bold uppercase tracking-tighter hover:underline underline-offset-2" style={{ color: 'var(--color-accent)' }}>
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage: string;
  type: 'blog' | 'podcast';
  duration?: string;
}

export function Home() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [latestEpisode, setLatestEpisode] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogQuery = query(
          collection(db, 'posts'),
          where('type', '==', 'blog'),
          orderBy('date', 'desc'),
          limit(3)
        );
        const blogSnapshot = await getDocs(blogQuery);
        setLatestPosts(blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post)));

        const podcastQuery = query(
          collection(db, 'posts'),
          where('type', '==', 'podcast'),
          orderBy('date', 'desc'),
          limit(1)
        );
        const podcastSnapshot = await getDocs(podcastQuery);
        if (!podcastSnapshot.empty) {
          setLatestEpisode({ id: podcastSnapshot.docs[0].id, ...podcastSnapshot.docs[0].data() } as Post);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-zinc-400" /></div>;

  return (
    <div className="space-y-16">
      {/* Welcome Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-serif font-bold text-black dark:text-white leading-tight">
          Exploring the deep psychology and meaning within Anime.
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
          Anime Trails is a minimalist space dedicated to analyzing the philosophical layers, character archetypes, and psychological depths of our favorite stories.
        </p>
      </section>

      {/* Latest Blogs */}
      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-900 pb-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Latest Blogs</h2>
          <Link to="/blogs" className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline">View all</Link>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {latestPosts.map((post) => (
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
                  <h3 className="text-lg font-serif font-bold text-black dark:text-white group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-[13px] text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Latest Podcast */}
      {latestEpisode && (
        <section className="space-y-8">
          <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Latest Podcast</h2>
            <Link to="/podcasts" className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline">Listen all</Link>
          </div>

          <article className="py-8 first:pt-0 flex flex-col sm:flex-row gap-6 items-start group">
            <div className="w-full sm:w-32 md:w-40 shrink-0 aspect-[4/3] overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative">
              <img
                src={latestEpisode.coverImage}
                alt={latestEpisode.title}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] px-1.5 py-0.5 rounded-sm font-mono">
                {latestEpisode.duration}
              </div>
            </div>
            <div className="space-y-2 flex-grow">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                <span style={{ color: 'var(--color-accent)' }}>Podcast</span>
                <span>/</span>
                <span>{latestEpisode.date}</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-black dark:text-white group-hover:text-[var(--color-accent)] transition-colors leading-snug cursor-pointer">
                {latestEpisode.title}
              </h3>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {latestEpisode.excerpt}
              </p>
            </div>
          </article>
        </section>
      )}
    </div>
  );
}

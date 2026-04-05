import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Loader2 } from 'lucide-react';

interface PostData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  coverImage: string;
}

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as PostData);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-zinc-400" /></div>;

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-lg font-serif font-bold mb-4 text-black dark:text-white">Entry Not Found</h1>
        <Link to="/" className="text-xs text-zinc-500 hover:underline">Back to Index</Link>
      </div>
    );
  }

  const isHtml = post.content.trim().startsWith('<');

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
        {isHtml ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <ReactMarkdown>{post.content}</ReactMarkdown>
        )}
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

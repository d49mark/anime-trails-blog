import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle, logout, db, storage } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Editor } from '../components/Editor';
import { Plus, LogOut, Trash2, Edit2, Save, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  coverImage: string;
  type: 'blog' | 'podcast';
}

export function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<Post>>({
    type: 'blog',
    category: 'Analysis',
    author: 'Admin',
    date: new Date().toISOString().split('T')[0],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) fetchPosts();
    });
    return unsubscribe;
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
    setPosts(fetchedPosts);
  };

  const handleSave = async () => {
    if (!currentPost.title || !currentPost.content) return;
    setSaving(true);
    try {
      if (currentPost.id) {
        await updateDoc(doc(db, 'posts', currentPost.id), currentPost);
      } else {
        await addDoc(collection(db, 'posts'), {
          ...currentPost,
          date: new Date().toISOString().split('T')[0],
        });
      }
      setIsEditing(false);
      setCurrentPost({
        type: 'blog',
        category: 'Analysis',
        author: 'Admin',
        date: new Date().toISOString().split('T')[0],
      });
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteDoc(doc(db, 'posts', id));
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const storageRef = ref(storage, `cover-images/${Date.now()}-${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setCurrentPost({ ...currentPost, coverImage: url });
    } catch (error) {
      console.error('Error uploading cover image:', error);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <h1 className="text-2xl font-serif font-bold">Admin Login</h1>
        <button
          onClick={signInWithGoogle}
          className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:opacity-80 transition-opacity"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
          <button onClick={logout} className="p-2 text-zinc-500 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 bg-white dark:bg-black p-6 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex justify-between items-center sticky top-0 bg-white dark:bg-black py-4 z-10 border-b border-zinc-100 dark:border-zinc-900">
                <h2 className="text-2xl font-serif font-bold">
                  {currentPost.id ? 'Edit Post' : 'Create New Post'}
                </h2>
                <div className="flex items-center space-x-4">
                  <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <X className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Post</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Title</label>
                  <input
                    type="text"
                    value={currentPost.title || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                    className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none"
                    placeholder="Enter post title..."
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Type</label>
                  <select
                    value={currentPost.type}
                    onChange={(e) => setCurrentPost({ ...currentPost, type: e.target.value as 'blog' | 'podcast' })}
                    className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none"
                  >
                    <option value="blog">Blog Post</option>
                    <option value="podcast">Podcast Episode</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Cover Image</label>
                <div className="flex items-start space-x-4">
                  {currentPost.coverImage && (
                    <img src={currentPost.coverImage} className="w-32 h-20 object-cover rounded-lg" />
                  )}
                  <label className="flex flex-col items-center justify-center w-32 h-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    <ImageIcon className="w-6 h-6 text-zinc-400" />
                    <span className="text-[10px] font-bold uppercase text-zinc-400 mt-1">Upload</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Excerpt</label>
                <textarea
                  value={currentPost.excerpt || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                  className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none h-24"
                  placeholder="Short summary for the home page..."
                />
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">Content</label>
                <Editor
                  content={currentPost.content || ''}
                  onChange={(content) => setCurrentPost({ ...currentPost, content })}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center space-x-4">
              <img src={post.coverImage} className="w-16 h-16 object-cover rounded-xl" />
              <div>
                <h3 className="font-serif font-bold text-lg">{post.title}</h3>
                <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.type}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setCurrentPost(post);
                  setIsEditing(true);
                }}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-zinc-500 hover:text-red-500 rounded-full transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

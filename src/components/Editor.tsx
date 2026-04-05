import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Image as ImageIcon, Quote } from 'lucide-react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-6',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing your story...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-zinc dark:prose-invert max-w-none focus:outline-none min-h-[400px] py-4',
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        for (const item of items) {
          if (item.type.indexOf('image') === 0) {
            const file = item.getAsFile();
            if (file) {
              uploadImage(file);
              return true;
            }
          }
        }
        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.indexOf('image') === 0) {
            uploadImage(file);
            return true;
          }
        }
        return false;
      },
    },
  });

  const uploadImage = useCallback(async (file: File) => {
    const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      editor?.chain().focus().setImage({ src: url }).run();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-black">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 ${editor.isActive('bold') ? 'bg-zinc-200 dark:bg-zinc-800' : ''}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 ${editor.isActive('italic') ? 'bg-zinc-200 dark:bg-zinc-800' : ''}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 ${editor.isActive('heading', { level: 1 }) ? 'bg-zinc-200 dark:bg-zinc-800' : ''}`}
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200 dark:bg-zinc-800' : ''}`}
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 ${editor.isActive('bulletList') ? 'bg-zinc-200 dark:bg-zinc-800' : ''}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 ${editor.isActive('orderedList') ? 'bg-zinc-200 dark:bg-zinc-800' : ''}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 ${editor.isActive('blockquote') ? 'bg-zinc-200 dark:bg-zinc-800' : ''}`}
        >
          <Quote className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />
        <label className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer">
          <ImageIcon className="w-4 h-4" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadImage(file);
            }}
          />
        </label>
      </div>
      <div className="px-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, useEffect, useRef } from 'react';

interface RichTextEditorProps {
  value?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: string;
}

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Escribe aquí...',
  height = 'h-40',
}: RichTextEditorProps) {
  const [showCode, setShowCode] = useState(false);
  const [htmlCode, setHtmlCode] = useState('');
  const [hasPendingHtmlChanges, setHasPendingHtmlChanges] = useState(false);
  const isInternalUpdate = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      isInternalUpdate.current = true;
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm dark:prose-invert max-w-none px-3 py-2 focus:outline-none text-gray-700 dark:text-gray-300',
      },
    },
  });

  // Only sync external value changes (not internal edits from the user)
  useEffect(() => {
    if (!editor) return;
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    if (value && editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleCode = () => editor.chain().focus().toggleCode().run();
  const toggleH1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run();
  const toggleH2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleH3 = () => editor.chain().focus().toggleHeading({ level: 3 }).run();
  const toggleH4 = () => editor.chain().focus().toggleHeading({ level: 4 }).run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();

  const setLink = () => {
    const url = window.prompt('Ingresa la URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const unsetLink = () => editor.chain().focus().unsetLink().run();

  return (
    <div className="border rounded dark:bg-gray-700 dark:border-gray-600 overflow-hidden">
      {/* Barra de herramientas */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-600 p-2 flex flex-wrap gap-1">
        {/* Formato Básico */}
        <button
          type="button"
          onClick={toggleBold}
          className={`px-3 py-1 rounded text-sm font-bold transition ${
            editor.isActive('bold')
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Negrilla"
        >
          B
        </button>

        <button
          type="button"
          onClick={toggleItalic}
          className={`px-3 py-1 rounded text-sm italic transition ${
            editor.isActive('italic')
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Itálica"
        >
          I
        </button>

        <button
          type="button"
          onClick={toggleStrike}
          className={`px-3 py-1 rounded text-sm line-through transition ${
            editor.isActive('strike')
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Tachado"
        >
          S
        </button>

        <button
          type="button"
          onClick={toggleCode}
          className={`px-3 py-1 rounded text-sm font-mono transition ${
            editor.isActive('code')
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Código"
        >
          {'<>'}
        </button>

        {/* Separador */}
        <div className="w-px bg-gray-300 dark:bg-gray-600" />

        {/* Títulos */}
        <button
          type="button"
          onClick={toggleH1}
          className={`px-3 py-1 rounded text-sm font-bold transition ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Título 1"
        >
          H1
        </button>

        <button
          type="button"
          onClick={toggleH2}
          className={`px-3 py-1 rounded text-sm font-bold transition ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Título 2"
        >
          H2
        </button>

        <button
          type="button"
          onClick={toggleH3}
          className={`px-3 py-1 rounded text-sm font-bold transition ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Título 3"
        >
          H3
        </button>

        <button
          type="button"
          onClick={toggleH4}
          className={`px-3 py-1 rounded text-sm font-bold transition ${
            editor.isActive('heading', { level: 4 })
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Título 4"
        >
          H4
        </button>

        {/* Separador */}
        <div className="w-px bg-gray-300 dark:bg-gray-600" />

        {/* Listas */}
        <button
          type="button"
          onClick={toggleBulletList}
          className={`px-3 py-1 rounded text-sm transition ${
            editor.isActive('bulletList')
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Lista de puntos"
        >
          • Lista
        </button>

        <button
          type="button"
          onClick={toggleOrderedList}
          className={`px-3 py-1 rounded text-sm transition ${
            editor.isActive('orderedList')
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Lista numerada"
        >
          1. Lista
        </button>

        {/* Separador */}
        <div className="w-px bg-gray-300 dark:bg-gray-600" />

        {/* Blockquote y Código */}
        <button
          type="button"
          onClick={toggleBlockquote}
          className={`px-3 py-1 rounded text-sm transition ${
            editor.isActive('blockquote')
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Cita"
        >
          {'"'}
        </button>

        <button
          type="button"
          onClick={toggleCodeBlock}
          className={`px-3 py-1 rounded text-sm transition ${
            editor.isActive('codeBlock')
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Bloque de código"
        >
          {'{}'}
        </button>

        {/* Separador */}
        <div className="w-px bg-gray-300 dark:bg-gray-600" />

        {/* Enlaces */}
        <button
          type="button"
          onClick={setLink}
          className={`px-3 py-1 rounded text-sm transition ${
            editor.isActive('link')
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Agregar enlace"
        >
          🔗 Link
        </button>

        <button
          type="button"
          onClick={unsetLink}
          className="px-3 py-1 rounded text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title="Remover enlace"
        >
          🔗 ✕
        </button>

        {/* Separador */}
        <div className="w-px bg-gray-300 dark:bg-gray-600 ml-auto" />

        {/* Ver Código */}
        <button
          type="button"
          onClick={() => {
            if (!showCode) {
              setHtmlCode(editor.getHTML());
              setHasPendingHtmlChanges(false);
              setShowCode(true);
            } else {
              editor.commands.setContent(htmlCode, { emitUpdate: false });
              onChange(htmlCode);
              setHasPendingHtmlChanges(false);
              setShowCode(false);
            }
          }}
          className={`px-3 py-1 rounded text-sm transition ${
            showCode
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Ver código HTML"
        >
          {'</>'} HTML
        </button>

      </div>

      {/* Editor */}
      {!showCode ? (
        <div
          className={`${height} overflow-y-auto bg-white dark:bg-gray-700 border-t dark:border-gray-600`}
          style={{ resize: 'vertical', minHeight: '8rem' }}
        >
          <EditorContent editor={editor} />
        </div>
      ) : (
        <textarea
          value={htmlCode}
          onChange={(e) => {
            const nextHtml = e.target.value;
            setHtmlCode(nextHtml);
            onChange(nextHtml);
            setHasPendingHtmlChanges(true);
          }}
          className={`w-full ${height} p-3 font-mono text-sm border-t dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none`}
          style={{ resize: 'vertical', minHeight: '8rem' }}
          placeholder="HTML code..."
          spellCheck={false}
        />
      )}

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-600 px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
        {showCode && hasPendingHtmlChanges
          ? 'Tienes cambios HTML sin aplicar'
          : 'Formato: HTML | Puedes pegar código directamente'}
      </div>
    </div>
  );
}

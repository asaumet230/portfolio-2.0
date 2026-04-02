'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { HardBreak } from '@tiptap/extension-hard-break';
import { useEffect, useRef, useState } from 'react';
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough,
  FaListUl, FaListOl, FaAlignLeft, FaAlignCenter,
  FaAlignRight, FaAlignJustify, FaLink, FaUnlink,
  FaImage, FaCode, FaQuoteLeft,
} from 'react-icons/fa';
import { MdOutlineCode } from 'react-icons/md';

interface RichTextEditorProps {
  value?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: string;
}

// Enter = <br> excepto dentro de listas (donde crea nuevo item)
const CustomHardBreak = HardBreak.extend({
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { $from } = this.editor.state.selection;
        for (let depth = $from.depth; depth > 0; depth--) {
          const name = $from.node(depth).type.name;
          if (name === 'listItem' || name === 'bulletList' || name === 'orderedList') {
            return false; // deja que la lista maneje el Enter
          }
        }
        return this.editor.commands.setHardBreak();
      },
    };
  },
});

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Escribe aquí...',
  height = 'h-64',
}: RichTextEditorProps) {
  const [showCode, setShowCode] = useState(false);
  const [htmlCode, setHtmlCode] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const isInternalUpdate = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        hardBreak: false, // lo reemplazamos con CustomHardBreak
        heading: { levels: [1, 2, 3, 4] },
      }),
      CustomHardBreak,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded my-2',
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
          'prose prose-sm dark:prose-invert max-w-none px-4 py-3 focus:outline-none min-h-full text-gray-800 dark:text-gray-200',
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    if (value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload-editor', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    } catch {
      alert('Error subiendo la imagen');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageByUrl = () => {
    const url = window.prompt('URL de la imagen:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const url = window.prompt('URL del enlace:');
    if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const btn = (active: boolean) =>
    `px-2 py-1.5 rounded text-sm transition ${
      active
        ? 'bg-blue-500 text-white'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
    }`;

  const sep = <div className="w-px bg-gray-300 dark:bg-gray-600 self-stretch mx-0.5" />;

  return (
    <div className="border rounded-lg dark:bg-gray-700 dark:border-gray-600 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-600 p-2 flex flex-wrap gap-1 items-center">

        {/* Formato básico */}
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))} title="Negrilla (Ctrl+B)">
          <FaBold />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive('italic'))} title="Itálica (Ctrl+I)">
          <FaItalic />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor.isActive('underline'))} title="Subrayado (Ctrl+U)">
          <FaUnderline />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive('strike'))} title="Tachado">
          <FaStrikethrough />
        </button>

        {sep}

        {/* Títulos */}
        {([1, 2, 3, 4] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={`${btn(editor.isActive('heading', { level }))} font-bold text-xs`}
            title={`Título ${level}`}
          >
            H{level}
          </button>
        ))}

        {sep}

        {/* Alineación */}
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btn(editor.isActive({ textAlign: 'left' }))} title="Alinear izquierda">
          <FaAlignLeft />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btn(editor.isActive({ textAlign: 'center' }))} title="Centrar">
          <FaAlignCenter />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btn(editor.isActive({ textAlign: 'right' }))} title="Alinear derecha">
          <FaAlignRight />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={btn(editor.isActive({ textAlign: 'justify' }))} title="Justificar">
          <FaAlignJustify />
        </button>

        {sep}

        {/* Listas */}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))} title="Lista de puntos">
          <FaListUl />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive('orderedList'))} title="Lista numerada">
          <FaListOl />
        </button>

        {sep}

        {/* Blockquote y código */}
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive('blockquote'))} title="Cita">
          <FaQuoteLeft />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={btn(editor.isActive('code'))} title="Código inline">
          <FaCode />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btn(editor.isActive('codeBlock'))} title="Bloque de código">
          <MdOutlineCode size={16} />
        </button>

        {sep}

        {/* Enlace */}
        <button type="button" onClick={setLink} className={btn(editor.isActive('link'))} title="Agregar enlace">
          <FaLink />
        </button>
        <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} className={btn(false)} title="Quitar enlace">
          <FaUnlink />
        </button>

        {sep}

        {/* Imagen */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`${btn(false)} flex items-center gap-1`}
          title="Subir imagen"
          disabled={uploadingImage}
        >
          <FaImage />
          {uploadingImage && <span className="text-xs">Subiendo...</span>}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
            e.target.value = '';
          }}
        />
        <button type="button" onClick={handleImageByUrl} className={btn(false)} title="Imagen por URL">
          URL img
        </button>

        {/* HTML */}
        <div className="w-px bg-gray-300 dark:bg-gray-600 self-stretch ml-auto" />
        <button
          type="button"
          onClick={() => {
            if (!showCode) {
              setHtmlCode(editor.getHTML());
              setShowCode(true);
            } else {
              editor.commands.setContent(htmlCode, { emitUpdate: false });
              onChange(htmlCode);
              setShowCode(false);
            }
          }}
          className={btn(showCode)}
          title="Ver / editar HTML"
        >
          {'</>'}
        </button>
      </div>

      {/* Área de edición */}
      {!showCode ? (
        <div
          className={`${height} overflow-y-auto bg-white dark:bg-gray-700`}
          style={{ resize: 'vertical', minHeight: '10rem' }}
        >
          <EditorContent editor={editor} className="h-full" />
        </div>
      ) : (
        <textarea
          value={htmlCode}
          onChange={(e) => {
            setHtmlCode(e.target.value);
            onChange(e.target.value);
          }}
          className={`w-full ${height} p-3 font-mono text-sm bg-white dark:bg-gray-700 dark:text-gray-300 focus:outline-none`}
          style={{ resize: 'vertical', minHeight: '10rem' }}
          spellCheck={false}
        />
      )}

      {/* Footer */}
      <div className="bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-600 px-3 py-1.5 text-xs text-gray-400">
        Enter = salto de línea (<code>&lt;br&gt;</code>) · Shift+Enter = nuevo párrafo · Ctrl+B/I/U
      </div>
    </div>
  );
}

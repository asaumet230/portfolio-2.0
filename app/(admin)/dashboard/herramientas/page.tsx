'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { DataTable } from '@/components/admin/tables/DataTable';
import { Modal } from '@/components/admin/modals/Modal';
import { DeleteConfirmModal } from '@/components/admin/modals/DeleteConfirmModal';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import { FaWrench, FaAlignLeft, FaImage } from 'react-icons/fa';

interface Tool {
  _id: string;
  title: string;
  description: string;
  images: string[];
  progress: number;
}

const EMPTY_FORM = { title: '', description: '', progress: 50, image: '', imageDark: '' };

const inputClass = 'w-full pl-10 pr-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500';
const iconClass  = 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4';

export default function HerramientasPage() {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileDarkInputRef = useRef<HTMLInputElement>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingDark, setUploadingDark] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(tools.length / itemsPerPage);
  const paginatedTools = tools.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (value: number) => { setItemsPerPage(value); setCurrentPage(1); };

  useEffect(() => { fetchTools(); }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/tools');
      setTools(response.tools || []);
    } catch {
      toast.error('Error al cargar herramientas');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tool: Tool) => {
    setSelectedTool(tool);
    setFormData({
      title:       tool.title,
      description: tool.description,
      progress:    tool.progress,
      image:       tool.images?.[0] || '',
      imageDark:   tool.images?.[1] || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (tool: Tool) => {
    setSelectedTool(tool);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title) { toast.error('El nombre es requerido'); return; }
    try {
      const token = (session as any)?.accessToken;
      const payload: any = {
        title:       formData.title,
        description: formData.description,
        progress:    formData.progress,
      };
      const imgs = [formData.image, formData.imageDark].filter(Boolean);
      if (imgs.length) payload.images = imgs;
      if (selectedTool) {
        await apiClient.put(`/tools/${selectedTool._id}`, payload, token);
        toast.success('Herramienta actualizada');
      } else {
        await apiClient.post('/tools', payload, token);
        toast.success('Herramienta creada');
      }
      setIsModalOpen(false);
      setFormData(EMPTY_FORM);
      fetchTools();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedTool) return;
    try {
      const token = (session as any)?.accessToken;
      await apiClient.delete(`/tools/${selectedTool._id}`, token);
      toast.success('Herramienta eliminada');
      setIsDeleteModalOpen(false);
      fetchTools();
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload-profile', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al subir imagen');
      setFormData((prev) => ({ ...prev, image: data.url }));
      toast.success('Imagen subida');
    } catch (err: any) {
      toast.error(err.message || 'Error al subir imagen');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleDarkImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingDark(true);
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload-profile', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al subir imagen');
      setFormData((prev) => ({ ...prev, imageDark: data.url }));
      toast.success('Imagen dark subida');
    } catch (err: any) {
      toast.error(err.message || 'Error al subir imagen');
    } finally {
      setUploadingDark(false);
      e.target.value = '';
    }
  };

  const progressColor = formData.progress >= 80
    ? 'accent-green-500' : formData.progress >= 50
    ? 'accent-blue-500' : 'accent-yellow-500';

  const progressLabel = formData.progress >= 80
    ? 'text-green-600 dark:text-green-400' : formData.progress >= 50
    ? 'text-blue-600 dark:text-blue-400' : 'text-yellow-600 dark:text-yellow-400';

  const columns = [
    {
      key: 'images' as const,
      label: 'Icono',
      render: (value: string[]) =>
        value?.[0] ? (
          <img src={value[0]} alt="tool icon" className="w-10 h-10 object-contain rounded bg-gray-100 dark:bg-gray-700 p-1" />
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },
    { key: 'title' as const, label: 'Nombre' },
    {
      key: 'progress' as const,
      label: 'Progreso',
      render: (value: number) => {
        const style = value >= 80
          ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700'
          : value >= 50
          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700'
          : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
        return (
          <span className={`inline-block px-2 py-0.5 text-xs rounded font-medium border ${style}`}>
            {value}%
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Herramientas</h1>
        <button
          onClick={() => { setSelectedTool(null); setFormData(EMPTY_FORM); setIsModalOpen(true); }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm font-medium"
        >
          + Nueva Herramienta
        </button>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{tools.length} herramientas · página {currentPage} de {totalPages || 1}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Mostrar</span>
          {[5, 10, 20].map((n) => (
            <button key={n} onClick={() => handleItemsPerPageChange(n)}
              className={`w-10 py-1 text-sm rounded border transition text-center ${
                itemsPerPage === n
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}>{n}</button>
          ))}
        </div>
      </div>

      <div key={`${currentPage}-${itemsPerPage}`} style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
        <DataTable columns={columns} data={paginatedTools} loading={loading} onEdit={handleEdit} onDelete={handleDelete} emptyMessage="No hay herramientas" />
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
            className="px-4 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition">
            ← Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 text-sm rounded border transition ${
                currentPage === page ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}>{page}</button>
          ))}
          <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition">
            Siguiente →
          </button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTool ? 'Editar Herramienta' : 'Nueva Herramienta'}
        size="xl"
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
              Cancelar
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded transition">
              Guardar
            </button>
          </>
        }
      >
        <div className="space-y-4">

          {/* Iconos light + dark */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300">Light</p>
              <div className="relative group">
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}
                  className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" title="Subir icono light">
                  {formData.image ? (
                    <img src={formData.image} alt="Light" className="w-20 h-20 rounded-lg object-contain bg-gray-100 border-2 border-white shadow-md p-2" />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-gray-200 border-2 border-white shadow-md flex items-center justify-center">
                      <FaImage className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                    {uploadingImage
                      ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      : <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition">Cambiar</span>}
                  </div>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300">Dark</p>
              <div className="relative group">
                <button type="button" onClick={() => fileDarkInputRef.current?.click()} disabled={uploadingDark}
                  className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" title="Subir icono dark">
                  {formData.imageDark ? (
                    <img src={formData.imageDark} alt="Dark" className="w-20 h-20 rounded-lg object-contain bg-gray-800 border-2 border-gray-600 shadow-md p-2" />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-gray-700 border-2 border-gray-600 shadow-md flex items-center justify-center">
                      <FaImage className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                    {uploadingDark
                      ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      : <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition">Cambiar</span>}
                  </div>
                </button>
                <input ref={fileDarkInputRef} type="file" accept="image/*" className="hidden" onChange={handleDarkImageUpload} />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">Haz clic para subir los iconos (light y dark)</p>

          <div className="relative">
            <FaWrench className={iconClass} />
            <input type="text" placeholder="Nombre de la herramienta *" value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} />
          </div>

          <div className="relative">
            <FaAlignLeft className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <textarea placeholder="Descripción" value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full pl-10 pr-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          {/* Progress slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nivel de dominio</label>
              <span className={`text-lg font-bold ${progressLabel}`}>{formData.progress}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
              className={`w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-600 ${progressColor}`}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

        </div>
      </Modal>

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Eliminar Herramienta" message={`¿Estás seguro que deseas eliminar "${selectedTool?.title}"?`} />
    </div>
  );
}

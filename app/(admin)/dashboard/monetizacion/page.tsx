'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { apiClient } from '@/helpers/apiClient';

interface MonetizationForm {
  enabled: boolean;
  clientId: string;
  adsTxtContent: string;
  articleAdsEnabled: boolean;
  toolAdsEnabled: boolean;
  articleTopSlot: string;
  articleInlineSlot: string;
  articleBottomSlot: string;
  toolTopSlot: string;
  toolBottomSlot: string;
}

const defaultForm: MonetizationForm = {
  enabled: false,
  clientId: '',
  adsTxtContent: '',
  articleAdsEnabled: false,
  toolAdsEnabled: false,
  articleTopSlot: '',
  articleInlineSlot: '',
  articleBottomSlot: '',
  toolTopSlot: '',
  toolBottomSlot: '',
};

const inputClass = 'w-full px-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500';

export default function MonetizacionPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<MonetizationForm>(defaultForm);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/monetization/settings');
      setForm({ ...defaultForm, ...(response.settings || {}) });
    } catch {
      toast.error('Error al cargar configuración de monetización');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = (session as any)?.accessToken;
      await apiClient.put('/monetization/settings', form, token);
      toast.success('Monetización actualizada');
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar monetización');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Cargando configuración...</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Monetización</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Configura Google AdSense manual para artículos y herramientas.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Configuración Global</h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => setForm((prev) => ({ ...prev, enabled: e.target.checked }))}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Activar monetización</span>
        </label>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client ID</label>
          <input
            type="text"
            value={form.clientId}
            onChange={(e) => setForm((prev) => ({ ...prev, clientId: e.target.value.trim() }))}
            placeholder="ca-pub-7435467718185190"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ads.txt</label>
          <textarea
            rows={3}
            value={form.adsTxtContent}
            onChange={(e) => setForm((prev) => ({ ...prev, adsTxtContent: e.target.value }))}
            placeholder="google.com, pub-7435467718185190, DIRECT, f08c47fec0942fa0"
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Artículos</h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.articleAdsEnabled}
            onChange={(e) => setForm((prev) => ({ ...prev, articleAdsEnabled: e.target.checked }))}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Mostrar anuncios en artículos</span>
        </label>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slot superior</label>
            <input type="text" value={form.articleTopSlot} onChange={(e) => setForm((prev) => ({ ...prev, articleTopSlot: e.target.value.trim() }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slot intermedio</label>
            <input type="text" value={form.articleInlineSlot} onChange={(e) => setForm((prev) => ({ ...prev, articleInlineSlot: e.target.value.trim() }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slot inferior</label>
            <input type="text" value={form.articleBottomSlot} onChange={(e) => setForm((prev) => ({ ...prev, articleBottomSlot: e.target.value.trim() }))} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Herramientas</h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.toolAdsEnabled}
            onChange={(e) => setForm((prev) => ({ ...prev, toolAdsEnabled: e.target.checked }))}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Mostrar anuncios en herramientas</span>
        </label>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slot superior</label>
            <input type="text" value={form.toolTopSlot} onChange={(e) => setForm((prev) => ({ ...prev, toolTopSlot: e.target.value.trim() }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slot inferior</label>
            <input type="text" value={form.toolBottomSlot} onChange={(e) => setForm((prev) => ({ ...prev, toolBottomSlot: e.target.value.trim() }))} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? 'Guardando...' : 'Guardar configuración'}
        </button>
      </div>
    </div>
  );
}
